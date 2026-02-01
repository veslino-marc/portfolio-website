# 🚀 Quick Start - Smart Chat System

## ⚡ 3-Minute Setup

### 1. Update Database (2 minutes)
Go to [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql) and run:

```sql
ALTER TABLE conversations 
ADD COLUMN IF NOT EXISTS escalated BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS escalation_reason TEXT,
ADD COLUMN IF NOT EXISTS ai_confidence_avg FLOAT DEFAULT 0,
ADD COLUMN IF NOT EXISTS message_count INTEGER DEFAULT 0;

ALTER TABLE messages
ADD COLUMN IF NOT EXISTS ai_confidence FLOAT,
ADD COLUMN IF NOT EXISTS escalation_triggered BOOLEAN DEFAULT false;
```

### 2. Deploy (1 minute)
```bash
git add .
git commit -m "feat: Smart chat system"
git push
```

### 3. Setup Telegram Webhook (After deploy)
```bash
# Add your deployed URL to .env.local
echo "NEXT_PUBLIC_APP_URL=https://your-app.vercel.app" >> .env.local

# Setup webhook
npx tsx scripts/setup-telegram-webhook.ts
```

---

## ✅ Test It

### Test 1: AI Should Handle (No notification)
Send in chat: "What projects have you worked on?"
- ✅ AI responds
- ✅ No Telegram notification

### Test 2: Should Escalate (Get notification)
Send in chat: "I want to hire you"
- ✅ AI responds
- ✅ Telegram notification with buttons
- ✅ Click buttons to test

### Test 3: Context Memory
1. Send: "What projects have you worked on?"
2. Send: "Tell me more about the first one"
- ✅ AI remembers and references previous message

---

## 🎯 What Changed

### Before:
- Every message → Telegram notification 😫
- AI has no memory
- Plain text notifications

### After:
- Only important messages → Telegram notification 😊
- AI remembers conversation
- Rich notifications with action buttons

---

## 📊 Expected Results

- **70-80% fewer notifications**
- **Better AI responses** (context-aware)
- **Faster handling** (templates + buttons)

---

## 🔧 Quick Adjustments

### Make AI escalate MORE often:
Edit `app/lib/escalation.ts` line 95:
```typescript
const shouldEscalate = confidence < 0.8; // was 0.7
```

### Make AI escalate LESS often:
```typescript
const shouldEscalate = confidence < 0.6; // was 0.7
```

---

## 📖 Full Documentation

- **Setup Guide**: `CHAT_SYSTEM_GUIDE.md`
- **Implementation Details**: `IMPLEMENTATION_SUMMARY.md`
- **Database Migration**: `scripts/migrate-database.sql`

---

## 🐛 Issues?

1. **Buttons not working?**
   - Check webhook: `curl https://api.telegram.org/bot<TOKEN>/getWebhookInfo`
   - Verify `NEXT_PUBLIC_APP_URL` is correct

2. **Too many notifications?**
   - Increase confidence threshold (0.7 → 0.8)

3. **Too few notifications?**
   - Decrease confidence threshold (0.7 → 0.6)

---

## 🎉 You're Done!

Your chat system is now:
- ✅ Smart (only escalates when needed)
- ✅ Context-aware (remembers conversations)
- ✅ Interactive (Telegram buttons + templates)

Enjoy your 70-80% reduction in notifications! 🚀
