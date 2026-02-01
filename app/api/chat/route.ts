// API route to handle user messages and AI responses
import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/app/lib/supabase';
import { generateAIResponse } from '@/app/lib/gemini';
import { sendSmartTelegramNotification } from '@/app/lib/telegram';
import { analyzeEscalation, calculateConfidenceScore } from '@/app/lib/escalation';

export async function POST(request: NextRequest) {
    try {
        const { message, userId, userName, userEmail } = await request.json();

        if (!message || !userId) {
            return NextResponse.json(
                { error: 'Message and userId are required' },
                { status: 400 }
            );
        }

        // 1. Get or create conversation
        let conversation;
        const { data: existingConv } = await supabaseAdmin
            .from('conversations')
            .select('*')
            .eq('user_id', userId)
            .in('status', ['active', 'human_active', 'waiting_human'])
            .single();

        if (existingConv) {
            conversation = existingConv;

            // If human is active, send user message to Telegram immediately
            if (conversation.status === 'human_active') {
                await sendUserMessageToTelegram(conversation.id, userName, message);

                // Don't generate AI response, just save the message and return
                await supabaseAdmin
                    .from('messages')
                    .insert({
                        conversation_id: conversation.id,
                        sender_type: 'user',
                        message: message
                    });

                return NextResponse.json({
                    success: true,
                    response: "Marc will respond to you shortly...",
                    conversationId: conversation.id,
                    humanActive: true
                });
            }

            // Update message count
            await supabaseAdmin
                .from('conversations')
                .update({
                    message_count: (conversation.message_count || 0) + 1,
                    updated_at: new Date().toISOString()
                })
                .eq('id', conversation.id);
        } else {
            const { data: newConv, error } = await supabaseAdmin
                .from('conversations')
                .insert({
                    user_id: userId,
                    user_name: userName,
                    user_email: userEmail,
                    status: 'active',
                    message_count: 1
                })
                .select()
                .single();

            if (error) throw error;
            conversation = newConv;
        }

        // 2. Save user message
        const { error: userMsgError } = await supabaseAdmin
            .from('messages')
            .insert({
                conversation_id: conversation.id,
                sender_type: 'user',
                message: message
            });

        if (userMsgError) throw userMsgError;

        // 3. Get conversation history for context (last 10 messages)
        const { data: history } = await supabaseAdmin
            .from('messages')
            .select('sender_type, message, created_at')
            .eq('conversation_id', conversation.id)
            .order('created_at', { ascending: true })
            .limit(10);

        const conversationHistory = history?.map(msg => ({
            role: msg.sender_type === 'user' ? 'user' : 'assistant',
            content: msg.message
        })) || [];

        // Extract previous topics for context
        const previousTopics = history
            ?.filter(msg => msg.sender_type === 'user')
            .map(msg => {
                const lower = msg.message.toLowerCase();
                if (lower.includes('project')) return 'projects';
                if (lower.includes('skill')) return 'skills';
                if (lower.includes('hire') || lower.includes('work')) return 'hiring';
                return null;
            })
            .filter((topic, index, self) => topic && self.indexOf(topic) === index) as string[];

        // 4. Generate context-aware AI response
        const aiResponse = await generateAIResponse(
            message,
            conversationHistory,
            {
                name: userName,
                email: userEmail,
                previousTopics
            }
        );

        // 5. Calculate confidence score
        const confidence = calculateConfidenceScore(message, aiResponse);

        // 6. Analyze if escalation is needed
        const escalationAnalysis = analyzeEscalation({
            messageCount: (conversation.message_count || 0) + 1,
            recentMessages: history?.map(msg => ({
                sender_type: msg.sender_type,
                message: msg.message
            })) || [],
            userMessage: message,
            aiResponse
        });

        // 7. Save AI response with confidence score
        const { error: aiMsgError } = await supabaseAdmin
            .from('messages')
            .insert({
                conversation_id: conversation.id,
                sender_type: 'ai',
                message: aiResponse,
                ai_confidence: confidence,
                escalation_triggered: escalationAnalysis.shouldEscalate
            });

        if (aiMsgError) throw aiMsgError;

        // 8. Update conversation with escalation info if needed
        if (escalationAnalysis.shouldEscalate) {
            await supabaseAdmin
                .from('conversations')
                .update({
                    escalated: true,
                    escalation_reason: escalationAnalysis.reasons.join('; '),
                    status: 'waiting_human'
                })
                .eq('id', conversation.id);
        }

        // 9. Update average confidence
        const avgConfidence = history
            ? (history.reduce((sum, msg) => sum + (msg.sender_type === 'ai' ? confidence : 0), 0) /
                history.filter(msg => msg.sender_type === 'ai').length)
            : confidence;

        await supabaseAdmin
            .from('conversations')
            .update({ ai_confidence_avg: avgConfidence })
            .eq('id', conversation.id);

        // 10. Send smart Telegram notification (only if escalation needed)
        await sendSmartTelegramNotification({
            conversationId: conversation.id,
            userName: userName || 'Anonymous',
            userEmail,
            userMessage: message,
            aiResponse,
            messageCount: (conversation.message_count || 0) + 1,
            conversationHistory: history?.slice(-5).map(msg => ({
                sender: msg.sender_type === 'user' ? '👤 User' : '🤖 AI',
                message: msg.message,
                time: new Date(msg.created_at).toLocaleTimeString()
            })) || [],
            escalation: escalationAnalysis
        });

        // 11. Return AI response
        return NextResponse.json({
            success: true,
            response: aiResponse,
            conversationId: conversation.id,
            confidence,
            escalated: escalationAnalysis.shouldEscalate
        });

    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}


// Helper function to send user messages to Telegram when human is active
async function sendUserMessageToTelegram(conversationId: string, userName: string, message: string) {
    try {
        const TelegramBot = (await import('node-telegram-bot-api')).default;
        const token = process.env.TELEGRAM_BOT_TOKEN!;
        const chatId = process.env.TELEGRAM_CHAT_ID!;
        const bot = new TelegramBot(token);

        const notification = `
💬 *New message from ${userName}*

"${message}"

🆔 Conversation: \`${conversationId}\`

_Reply to continue the conversation_
`;

        await bot.sendMessage(chatId, notification, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });

        console.log('✅ User message sent to Telegram');
    } catch (error) {
        console.error('❌ Error sending user message to Telegram:', error);
    }
}
