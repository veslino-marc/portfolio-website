-- Migration script for Smart Chat System
-- Run this in your Supabase SQL Editor

-- Add new columns to conversations table
ALTER TABLE conversations 
ADD COLUMN IF NOT EXISTS escalated BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS escalation_reason TEXT,
ADD COLUMN IF NOT EXISTS ai_confidence_avg FLOAT DEFAULT 0,
ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

-- Add new columns to messages table
ALTER TABLE messages
ADD COLUMN IF NOT EXISTS ai_confidence FLOAT,
ADD COLUMN IF NOT EXISTS escalation_triggered BOOLEAN DEFAULT false;

-- Update existing conversations with message counts
UPDATE conversations c
SET message_count = (
    SELECT COUNT(*) 
    FROM messages m 
    WHERE m.conversation_id = c.id
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_escalated ON conversations(escalated);
CREATE INDEX IF NOT EXISTS idx_messages_escalation ON messages(escalation_triggered);

-- Verify migration
SELECT 
    'conversations' as table_name,
    COUNT(*) as total_rows,
    COUNT(*) FILTER (WHERE escalated = true) as escalated_count
FROM conversations
UNION ALL
SELECT 
    'messages' as table_name,
    COUNT(*) as total_rows,
    COUNT(*) FILTER (WHERE escalation_triggered = true) as escalated_count
FROM messages;
