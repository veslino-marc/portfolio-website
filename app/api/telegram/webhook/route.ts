// Telegram webhook handler for button interactions
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const bot = new TelegramBot(token);

export async function POST(request: NextRequest) {
    try {
        const update = await request.json();
        console.log('📥 Telegram webhook received:', JSON.stringify(update, null, 2));

        // Handle callback queries (button clicks)
        if (update.callback_query) {
            const callbackQuery = update.callback_query;
            const data = callbackQuery.data;
            const messageId = callbackQuery.message.message_id;
            const chatId = callbackQuery.message.chat.id;

            console.log('🔘 Button clicked:', data);

            const [action, ...rest] = data.split('_');
            const conversationId = rest.join('_'); // Handle conversation IDs with underscores

            switch (action) {
                case 'takeover':
                    await handleTakeover(conversationId, chatId, messageId);
                    break;
                case 'reply':
                    await handleQuickReply(conversationId, chatId, messageId);
                    break;
                case 'resolve':
                    await handleResolve(conversationId, chatId, messageId);
                    break;
                case 'history':
                    await handleViewHistory(conversationId, chatId);
                    break;
                case 'template':
                    const templateType = rest[0];
                    const templateConvId = rest.slice(1).join('_');
                    await handleTemplate(templateConvId, templateType, chatId, messageId);
                    break;
                case 'back':
                    // Restore original buttons
                    await bot.editMessageReplyMarkup(
                        {
                            inline_keyboard: [
                                [
                                    { text: '✅ Take Over', callback_data: `takeover_${conversationId}` },
                                    { text: '📝 Quick Reply', callback_data: `reply_${conversationId}` }
                                ],
                                [
                                    { text: '✔️ Mark Resolved', callback_data: `resolve_${conversationId}` },
                                    { text: '📊 View Full History', callback_data: `history_${conversationId}` }
                                ],
                                [
                                    { text: '💼 Business Inquiry', callback_data: `template_business_${conversationId}` },
                                    { text: '🤝 Collaboration', callback_data: `template_collab_${conversationId}` }
                                ]
                            ]
                        },
                        {
                            chat_id: chatId,
                            message_id: messageId
                        }
                    );
                    break;
                default:
                    console.log('⚠️ Unknown action:', action);
            }

            // Answer callback query to remove loading state
            await bot.answerCallbackQuery(callbackQuery.id, {
                text: '✅ Action processed'
            });
        }

        // Handle direct message replies
        if (update.message && update.message.reply_to_message) {
            console.log('💬 Direct reply received');
            await handleDirectReply(update.message);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error('❌ Telegram webhook error:', error);
        return NextResponse.json({
            error: 'Webhook processing failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}

async function handleTakeover(conversationId: string, chatId: number, messageId: number) {
    // Update conversation status
    await supabaseAdmin
        .from('conversations')
        .update({ status: 'human_active' })
        .eq('id', conversationId);

    // Edit message to show takeover
    await bot.editMessageText(
        '✅ *You took over this conversation*\n\nThe user will now receive your direct responses.',
        {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        }
    );

    // Send instructions
    await bot.sendMessage(
        chatId,
        `📝 *How to respond:*\n\nReply to this message with your response, and it will be sent to the user.\n\nConversation ID: \`${conversationId}\``,
        { parse_mode: 'Markdown' }
    );
}

async function handleQuickReply(conversationId: string, chatId: number, messageId: number) {
    await bot.editMessageReplyMarkup(
        {
            inline_keyboard: [
                [
                    { text: '💼 Business Template', callback_data: `template_business_${conversationId}` },
                    { text: '🤝 Collaboration Template', callback_data: `template_collab_${conversationId}` }
                ],
                [
                    { text: '📅 Availability Template', callback_data: `template_availability_${conversationId}` },
                    { text: '🔧 Technical Template', callback_data: `template_technical_${conversationId}` }
                ],
                [
                    { text: '👋 General Template', callback_data: `template_general_${conversationId}` }
                ],
                [
                    { text: '« Back', callback_data: `back_${conversationId}` }
                ]
            ]
        },
        {
            chat_id: chatId,
            message_id: messageId
        }
    );
}

async function handleResolve(conversationId: string, chatId: number, messageId: number) {
    await supabaseAdmin
        .from('conversations')
        .update({ status: 'closed', escalated: false })
        .eq('id', conversationId);

    await bot.editMessageText(
        '✅ *Conversation marked as resolved*\n\nThe conversation has been closed.',
        {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        }
    );
}

async function handleViewHistory(conversationId: string, chatId: number) {
    const { data: messages } = await supabaseAdmin
        .from('messages')
        .select('sender_type, message, created_at')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });

    if (!messages || messages.length === 0) {
        await bot.sendMessage(chatId, '❌ No conversation history found.');
        return;
    }

    const history = messages
        .map(msg => {
            const emoji = msg.sender_type === 'user' ? '👤' : msg.sender_type === 'ai' ? '🤖' : '👨‍💼';
            const time = new Date(msg.created_at).toLocaleString();
            return `${emoji} *${msg.sender_type.toUpperCase()}* (${time})\n${msg.message}\n`;
        })
        .join('\n---\n\n');

    // Split into chunks if too long
    const chunks = history.match(/[\s\S]{1,4000}/g) || [history];

    for (const chunk of chunks) {
        await bot.sendMessage(chatId, chunk, { parse_mode: 'Markdown' });
    }
}

async function handleTemplate(conversationId: string, templateType: string, chatId: number, messageId: number) {
    const { data: conversation } = await supabaseAdmin
        .from('conversations')
        .select('user_name')
        .eq('id', conversationId)
        .single();

    const userName = conversation?.user_name || 'there';

    const templates: Record<string, string> = {
        business: `Hi ${userName}! Thanks for reaching out about working together. I'd love to discuss your project in detail. Could you share more about what you're looking to build? You can also email me directly at marcveslino000@gmail.com or schedule a call at your convenience.`,
        collab: `Hey ${userName}! I'm always excited about collaboration opportunities. Let's connect and explore how we can work together. Feel free to reach out at marcveslino000@gmail.com or let me know your preferred way to chat.`,
        availability: `Hi ${userName}! I'm currently available for freelance projects and internship opportunities. I'd be happy to discuss how I can help with your needs. What kind of project do you have in mind?`,
        technical: `Thanks for the technical question, ${userName}! I'd be happy to dive deeper into this. Could you provide a bit more context about your use case? That'll help me give you the most relevant information.`,
        general: `Hi ${userName}! Thanks for your message. I'm Marc, and I'd be happy to help. What specific information are you looking for?`
    };

    const template = templates[templateType] || templates.general;

    await bot.sendMessage(
        chatId,
        `📝 *Template Response:*\n\n${template}\n\n_Edit this message and send it, or copy and customize it._`,
        { parse_mode: 'Markdown' }
    );

    await bot.editMessageText(
        '✅ Template sent! Edit and send your response.',
        {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'Markdown'
        }
    );
}

async function handleDirectReply(message: any) {
    try {
        const replyText = message.text;
        const chatId = message.chat.id;
        const originalMessage = message.reply_to_message.text;

        console.log('📝 Reply text:', replyText);
        console.log('📄 Original message:', originalMessage);

        // Try to extract conversation ID from the original message
        let conversationId: string | null = null;

        // Method 1: Look for "Conversation ID: `xxx`" pattern
        let match = originalMessage.match(/Conversation ID: `([^`]+)`/);
        if (match) {
            conversationId = match[1];
        }

        // Method 2: Look for "🆔 Conversation: `xxx`" pattern (from escalation notifications)
        if (!conversationId) {
            match = originalMessage.match(/🆔 Conversation: `([^`]+)`/);
            if (match) {
                conversationId = match[1];
            }
        }

        // Method 3: Get the most recent escalated conversation for this chat
        if (!conversationId) {
            console.log('⚠️ Could not extract conversation ID from message, trying to find recent escalation');
            const { data: recentConv } = await supabaseAdmin
                .from('conversations')
                .select('id')
                .eq('escalated', true)
                .in('status', ['waiting_human', 'human_active'])
                .order('updated_at', { ascending: false })
                .limit(1)
                .single();

            if (recentConv) {
                conversationId = recentConv.id;
                console.log('✅ Found recent conversation:', conversationId);
            }
        }

        if (!conversationId) {
            console.log('❌ Could not find conversation ID');
            await bot.sendMessage(
                chatId,
                '❌ Could not find conversation. Please click "Take Over" button first, then reply to the instruction message.',
                { reply_to_message_id: message.message_id }
            );
            return;
        }

        console.log('🆔 Conversation ID:', conversationId);

        // Check if conversation exists and is active
        const { data: conversation, error: convError } = await supabaseAdmin
            .from('conversations')
            .select('id, status, user_name')
            .eq('id', conversationId)
            .single();

        if (convError || !conversation) {
            console.error('❌ Conversation not found:', convError);
            await bot.sendMessage(
                chatId,
                '❌ Conversation not found or has been closed.',
                { reply_to_message_id: message.message_id }
            );
            return;
        }

        // Store the human response in the database
        const { error: insertError } = await supabaseAdmin
            .from('messages')
            .insert({
                conversation_id: conversationId,
                sender_type: 'human',
                message: replyText
            });

        if (insertError) {
            console.error('❌ Failed to store message:', insertError);
            await bot.sendMessage(
                chatId,
                '❌ Failed to send message. Please try again.',
                { reply_to_message_id: message.message_id }
            );
            return;
        }

        // Update conversation status to show human is active
        await supabaseAdmin
            .from('conversations')
            .update({
                status: 'human_active',
                updated_at: new Date().toISOString()
            })
            .eq('id', conversationId);

        // Send confirmation
        await bot.sendMessage(
            chatId,
            `✅ *Message sent to ${conversation.user_name || 'user'}!*\n\n"${replyText}"`,
            {
                parse_mode: 'Markdown',
                reply_to_message_id: message.message_id
            }
        );

        console.log('✅ Direct reply processed successfully');

    } catch (error) {
        console.error('❌ Error handling direct reply:', error);
        await bot.sendMessage(
            message.chat.id,
            '❌ An error occurred. Please try again or use the template buttons.',
            { reply_to_message_id: message.message_id }
        );
    }
}

