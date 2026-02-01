# Context Enhancement Plan (Without RAG)

## Phase 1: Conversation Summaries (Easy Win)

### What to Add:
```typescript
// After each conversation, store summary
{
  conversationId: "abc-123",
  summary: "User asked about React projects, interested in hiring for e-commerce",
  topics: ["react", "projects", "hiring"],
  userIntent: "business_inquiry",
  sentiment: "positive",
  keyQuestions: [
    "What React projects have you built?",
    "Can you build e-commerce sites?"
  ]
}
```

### Benefits:
- AI can reference "You previously asked about React projects"
- Better personalization across sessions
- Smarter escalation decisions

### Implementation:
1. Add `conversation_summaries` table to Supabase
2. Generate summary after every 5 messages
3. Pass summary to AI in next conversation

---

## Phase 2: Intent Detection (Medium)

### Track User Intent:
```typescript
const intents = {
  browsing: "Just looking around",
  learning: "Wants to learn about Marc",
  hiring: "Potential client/employer",
  networking: "Fellow developer",
  recruiting: "HR/recruiter"
}
```

### Benefits:
- Tailor responses based on intent
- Prioritize hiring inquiries
- Different tone for different users

---

## Phase 3: Smart Context Retrieval (Advanced)

### Instead of RAG, use smart SQL queries:

```typescript
// When user asks about React
const relevantInfo = await supabase
  .from('knowledge_base')
  .select('*')
  .or('tags.cs.{react}')
  .limit(3);

// Pass to AI
const context = `
Relevant information about Marc's React experience:
${relevantInfo.map(info => info.content).join('\n')}
`;
```

### Benefits:
- Retrieve specific information on demand
- No vector database needed
- Simple SQL queries

---

## Phase 4: Conversation Analytics

### Track patterns:
```sql
-- Most asked questions
SELECT question, COUNT(*) as count
FROM messages
WHERE sender_type = 'user'
GROUP BY question
ORDER BY count DESC
LIMIT 10;

-- Common follow-ups
SELECT 
  m1.message as first_question,
  m2.message as follow_up
FROM messages m1
JOIN messages m2 ON m1.conversation_id = m2.conversation_id
WHERE m1.sender_type = 'user' 
  AND m2.sender_type = 'user'
  AND m2.created_at > m1.created_at;
```

### Benefits:
- Identify gaps in AI knowledge
- Improve fallback responses
- Better understand users

---

## When to Consider RAG

Only implement RAG if you:
1. Add 50+ detailed project case studies
2. Write extensive blog posts (100+ articles)
3. Have technical documentation (1000+ pages)
4. Need to search across multiple sources

For a portfolio chatbot, **extended memory is enough!**

---

## Quick Wins (Implement Today)

### 1. Store Conversation Topics
```typescript
// In chat API route
const topics = extractTopics(conversationHistory);
await supabase
  .from('conversations')
  .update({ topics })
  .eq('id', conversationId);
```

### 2. Reference Previous Conversations
```typescript
// When user returns
const previousTopics = await getPreviousTopics(userId);
const context = `
User previously discussed: ${previousTopics.join(', ')}
`;
```

### 3. Smart Greeting
```typescript
if (isReturningUser) {
  return `Welcome back! Last time we talked about ${lastTopic}. 
          What would you like to know today?`;
}
```

---

## Cost Comparison

| Approach | Setup Cost | Monthly Cost | Complexity |
|----------|-----------|--------------|------------|
| Current (History) | $0 | $0 | Low |
| Extended Memory | $0 | $0 | Low |
| RAG | $100 | $20-50 | High |
| Fine-tuning | $500 | $100+ | Very High |

**Recommendation:** Start with Extended Memory, only add RAG if you scale significantly.
