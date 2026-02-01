// TypeScript types for the chatbot

export interface Conversation {
    id: string;
    user_id: string;
    user_name?: string;
    user_email?: string;
    status: 'active' | 'waiting_human' | 'closed';
    created_at: string;
    updated_at: string;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_type: 'user' | 'ai' | 'human';
    message: string;
    metadata?: Record<string, any>;
    created_at: string;
}

export interface TelegramNotification {
    id: string;
    conversation_id: string;
    message_id: string;
    telegram_message_id?: string;
    sent_at: string;
    status: 'sent' | 'read' | 'replied';
}

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}
