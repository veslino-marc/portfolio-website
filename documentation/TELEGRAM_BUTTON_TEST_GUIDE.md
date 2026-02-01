# Telegram Button Testing Guide

## Current Status
✅ Webhook configured and working
✅ Notifications sending successfully
✅ Button click handling implemented
⚠️ Direct message replies NOT implemented yet (only buttons work)

## How to Test Each Button

### 1. ✅ Take Over Button
**What it should do:**
- Changes conversation status to `human_active` in database
- Edits the notification message to show "You took over this conversation"
- Sends instructions on how to respond
- Shows conversation ID

**How to test:**
1. Trigger an escalation (ask "I want to hire you" in the chatbot)
2. Wait for Telegram notification
3. Click "✅ Take Over" button
4. Verify you see: "✅ You took over this conversation"
5. Verify you receive instructions message with conversation ID

**Expected behavior:**
```
✅ You took over this conversation

The user will now receive your direct responses.
```

Then a second message:
```
📝 How to respond:

Reply to this message with your response, and it will be sent to the user.

Conversation ID: `abc123...`
```

**Note:** Replying to this message won't work yet - direct replies are not implemented.

---

### 2. 📝 Quick Reply Button
**What it should do:**
- Shows 5 template options
- Displays a "Back" button to return to main menu

**How to test:**
1. Click "📝 Quick Reply" button
2. Verify you see 5 template buttons:
   - 💼 Business Template
   - 🤝 Collaboration Template
   - 📅 Availability Template
   - 🔧 Technical Template
   - 👋 General Template
3. Verify you see "« Back" button at bottom

**Expected behavior:**
The original notification message buttons should be replaced with template options.

---

### 3. Template Buttons (Business, Collaboration, etc.)
**What it should do:**
- Sends a pre-written template message
- Personalizes it with the user's name
- Shows "Template sent!" confirmation

**How to test:**
1. Click "📝 Quick Reply" first
2. Click any template button (e.g., "💼 Business Template")
3. Verify you receive a new message with the template text
4. Verify the original message shows "✅ Template sent! Edit and send your response."

**Expected template examples:**
- **Business:** "Hi [name]! Thanks for reaching out about working together..."
- **Collaboration:** "Hey [name]! I'm always excited about collaboration opportunities..."
- **Availability:** "Hi [name]! I'm currently available for freelance projects..."

**Note:** You can copy and edit the template, but sending it won't work yet (direct replies not implemented).

---

### 4. ✔️ Mark Resolved Button
**What it should do:**
- Updates conversation status to `closed` in database
- Sets `escalated` to `false`
- Shows confirmation message

**How to test:**
1. Click "✔️ Mark Resolved" button
2. Verify the message changes to: "✅ Conversation marked as resolved"

**Expected behavior:**
```
✅ Conversation marked as resolved

The conversation has been closed.
```

---

### 5. 📊 View Full History Button
**What it should do:**
- Fetches all messages from the conversation
- Sends them as formatted text with timestamps
- Shows sender type (USER/AI/HUMAN) with emojis

**How to test:**
1. Click "📊 View Full History" button
2. Verify you receive message(s) with full conversation history
3. Check that each message shows:
   - Emoji (👤 for user, 🤖 for AI, 👨‍💼 for human)
   - Sender type in caps
   - Timestamp
   - Message content

**Expected format:**
```
👤 USER (2/1/2026, 10:30:00 AM)
I want to hire you for a project

---

🤖 AI (2/1/2026, 10:30:05 AM)
I'd be happy to discuss your project! Could you tell me more about what you're looking to build?
```

**Note:** Long conversations will be split into multiple messages (4000 char limit).

---

### 6. « Back Button
**What it should do:**
- Returns to the original button layout
- Restores all 6 main buttons

**How to test:**
1. Click "📝 Quick Reply" to see templates
2. Click "« Back" button
3. Verify you see the original 6 buttons again:
   - ✅ Take Over
   - 📝 Quick Reply
   - ✔️ Mark Resolved
   - 📊 View Full History
   - 💼 Business Inquiry
   - 🤝 Collaboration

---

## Quick Test Checklist

Use this checklist to verify everything works:

- [ ] Trigger escalation (ask "I want to hire you")
- [ ] Receive Telegram notification with 6 buttons
- [ ] Click "✅ Take Over" → See takeover confirmation
- [ ] Click "📝 Quick Reply" → See 5 template options + Back
- [ ] Click "💼 Business Template" → Receive template message
- [ ] Click "« Back" → Return to main buttons
- [ ] Click "✔️ Mark Resolved" → See resolved confirmation
- [ ] Click "📊 View Full History" → Receive conversation history
- [ ] Click "💼 Business Inquiry" → Receive business template
- [ ] Click "🤝 Collaboration" → Receive collaboration template

---

## Troubleshooting

### If buttons don't respond:
1. Check Vercel logs for webhook errors
2. Verify webhook is set: Run `npx tsx scripts/setup-telegram-webhook.ts`
3. Check environment variables in Vercel:
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### If you get "Action processed" but nothing happens:
- Check Vercel function logs for errors
- Verify Supabase connection is working
- Check conversation ID format (should handle underscores)

### If templates show wrong name:
- Check if `user_name` is stored in conversations table
- Verify conversation ID is correct

---

## What's NOT Implemented Yet

❌ **Direct Message Replies**
- Replying to Telegram messages won't send to the user
- Only button interactions work
- To implement this, we need to:
  1. Store conversation ID in a way that links to Telegram message
  2. Handle `update.message.reply_to_message` in webhook
  3. Send the reply to the website chat via Supabase
  4. Implement real-time updates on the website

---

## Testing Tips

1. **Test in order:** Start with "Take Over" to understand the flow
2. **Check database:** Verify status changes in Supabase after clicking buttons
3. **Watch Vercel logs:** Real-time logs show webhook activity
4. **Test edge cases:** Try clicking buttons multiple times, clicking different buttons in sequence
5. **Test long conversations:** Create a conversation with 10+ messages and test "View Full History"

---

## Success Criteria

All buttons should:
✅ Respond within 1-2 seconds
✅ Show "Action processed" notification
✅ Update the message or send new messages
✅ Not show any errors
✅ Work consistently on repeated clicks

---

## Next Steps (Future Implementation)

If you want to implement direct message replies:
1. Modify webhook to handle `update.message.reply_to_message`
2. Extract conversation ID from the reply
3. Store the human response in Supabase messages table
4. Implement real-time listener on website to show human responses
5. Update conversation status to show "Human is responding..."
