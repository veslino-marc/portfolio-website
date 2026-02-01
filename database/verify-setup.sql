-- Verification script to check if everything is set up correctly

-- 1. Check if new columns exist in conversations table
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'conversations' 
AND column_name IN ('escalated', 'escalation_reason', 'ai_confidence_avg', 'message_count')
ORDER BY column_name;

-- 2. Check if new columns exist in messages table
SELECT 
    column_name, 
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'messages' 
AND column_name IN ('ai_confidence', 'escalation_triggered')
ORDER BY column_name;

-- 3. Check recent conversations with new data
SELECT 
    id,
    user_name,
    message_count,
    escalated,
    ai_confidence_avg,
    status,
    created_at
FROM conversations
ORDER BY created_at DESC
LIMIT 5;

-- 4. Check recent messages with confidence scores
SELECT 
    id,
    sender_type,
    LEFT(message, 50) as message_preview,
    ai_confidence,
    escalation_triggered,
    created_at
FROM messages
ORDER BY created_at DESC
LIMIT 10;

-- 5. Summary statistics
SELECT 
    'Total Conversations' as metric,
    COUNT(*)::text as value
FROM conversations
UNION ALL
SELECT 
    'Escalated Conversations',
    COUNT(*)::text
FROM conversations
WHERE escalated = true
UNION ALL
SELECT 
    'Total Messages',
    COUNT(*)::text
FROM messages
UNION ALL
SELECT 
    'Messages with Confidence',
    COUNT(*)::text
FROM messages
WHERE ai_confidence IS NOT NULL;
