// Telegram bot configuration
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TELEGRAM_BOT_TOKEN!;
const chatId = process.env.TELEGRAM_CHAT_ID!;

// Create bot instance (only for sending notifications)
let bot: TelegramBot | null = null;

function getBot() {
    if (!bot) {
        bot = new TelegramBot(token);
    }
    return bot;
}

interface EscalationInfo {
    shouldEscalate: boolean;
    confidence: number;
    reasons: string[];
    urgency: 'low' | 'medium' | 'high';
}

interface ConversationSummary {
    conversationId: string;
    userName: string;
    userEmail?: string;
    userMessage: string;
    aiResponse: string;
    messageCount: number;
    conversationHistory: Array<{ sender: string; message: string; time: string }>;
    escalation: EscalationInfo;
}

export async function sendSmartTelegramNotification(
    summary: ConversationSummary
): Promise<void> {
    try {
        const bot = getBot();
        const { escalation } = summary;

        // Only send if escalation is needed
        if (!escalation.shouldEscalate) {
            console.log('✅ AI handled conversation successfully - no notification sent');
            return;
        }

        // Urgency emoji
        const urgencyEmoji = {
            high: '🔴',
            medium: '🟡',
            low: '🟢'
        }[escalation.urgency];

        // Build conversation history preview (last 3 messages)
        const historyPreview = summary.conversationHistory
            .slice(-3)
            .map(msg => `${msg.sender}: ${msg.message.substring(0, 80)}${msg.message.length > 80 ? '...' : ''}`)
            .join('\n');

        const message = `
${urgencyEmoji} *ESCALATION NEEDED* ${urgencyEmoji}

👤 *User:* ${summary.userName}${summary.userEmail ? ` (${summary.userEmail})` : ''}
💬 *Messages:* ${summary.messageCount}
🎯 *Confidence:* ${Math.round(escalation.confidence * 100)}%
⚠️ *Urgency:* ${escalation.urgency.toUpperCase()}

📋 *Escalation Reasons:*
${escalation.reasons.map(r => `• ${r}`).join('\n')}

💬 *Latest Message:*
"${summary.userMessage}"

🤖 *AI Response:*
"${summary.aiResponse.substring(0, 150)}${summary.aiResponse.length > 150 ? '...' : ''}"

📊 *Recent History:*
${historyPreview}

🆔 Conversation: \`${summary.conversationId}\`
`;

        // Send message with inline keyboard
        await bot.sendMessage(chatId, message, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [
                        { text: '✅ Take Over', callback_data: `takeover_${summary.conversationId}` },
                        { text: '📝 Quick Reply', callback_data: `reply_${summary.conversationId}` }
                    ],
                    [
                        { text: '✔️ Mark Resolved', callback_data: `resolve_${summary.conversationId}` },
                        { text: '📊 View Full History', callback_data: `history_${summary.conversationId}` }
                    ],
                    [
                        { text: '💼 Business Inquiry', callback_data: `template_business_${summary.conversationId}` },
                        { text: '🤝 Collaboration', callback_data: `template_collab_${summary.conversationId}` }
                    ]
                ]
            }
        });

        console.log(`📤 Smart notification sent - ${escalation.urgency} urgency`);
    } catch (error) {
        console.error('Telegram notification error:', error);
    }
}

// Legacy function for backward compatibility
export async function sendTelegramNotification(
    conversationId: string,
    userName: string,
    userMessage: string,
    aiResponse: string
): Promise<void> {
    try {
        const bot = getBot();

        const message = `
🔔 *New Message from ${userName}*

👤 *User:* ${userMessage}

🤖 *AI Response:* ${aiResponse}

📊 *Conversation ID:* \`${conversationId}\`
`;

        await bot.sendMessage(chatId, message, {
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });
    } catch (error) {
        console.error('Telegram notification error:', error);
    }
}

export async function sendTelegramMessage(message: string): Promise<void> {
    try {
        const bot = getBot();
        await bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    } catch (error) {
        console.error('Telegram send message error:', error);
    }
}

// Response templates for quick replies
export const responseTemplates = {
    business: (userName: string) => `Hi ${userName}! Thanks for reaching out about working together. I'd love to discuss your project in detail. Could you share more about what you're looking to build? You can also email me directly at marcveslino000@gmail.com or schedule a call at your convenience.`,

    collaboration: (userName: string) => `Hey ${userName}! I'm always excited about collaboration opportunities. Let's connect and explore how we can work together. Feel free to reach out at marcveslino000@gmail.com or let me know your preferred way to chat.`,

    availability: (userName: string) => `Hi ${userName}! I'm currently available for freelance projects and internship opportunities. I'd be happy to discuss how I can help with your needs. What kind of project do you have in mind?`,

    technical: (userName: string) => `Thanks for the technical question, ${userName}! I'd be happy to dive deeper into this. Could you provide a bit more context about your use case? That'll help me give you the most relevant information.`,

    general: (userName: string) => `Hi ${userName}! Thanks for your message. I'm Marc, and I'd be happy to help. What specific information are you looking for?`
};

