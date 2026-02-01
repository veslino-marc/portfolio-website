# Telegram Buttons - Quick Reference

## 🚀 Quick Test (30 seconds)

```bash
# Send test message with buttons to your Telegram
npx tsx scripts/test-telegram-buttons.ts
```

Then click each button in Telegram to verify they work!

---

## 📋 What Each Button Does

| Button | Action |
|--------|--------|
| ✅ Take Over | Changes status to "human active" + shows instructions |
| 📝 Quick Reply | Shows 5 template options |
| ✔️ Mark Resolved | Closes conversation |
| 📊 View Full History | Shows all messages in conversation |
| 💼 Business Inquiry | Sends business template |
| 🤝 Collaboration | Sends collaboration template |

---

## 🧪 Test Commands

```bash
# Check if webhook is configured correctly
npx tsx scripts/check-webhook-status.ts

# Send test message with all buttons
npx tsx scripts/test-telegram-buttons.ts

# Setup/reset webhook URL
npx tsx scripts/setup-telegram-webhook.ts
```

---

## 🐛 If Buttons Don't Work

1. **Check webhook status:**
   ```bash
   npx tsx scripts/check-webhook-status.ts
   ```

2. **Check Vercel logs:**
   - Go to: https://vercel.com/dashboard
   - Click your project
   - Click "Logs" tab
   - Look for errors when clicking buttons

3. **Verify environment variables in Vercel:**
   - `TELEGRAM_BOT_TOKEN`
   - `TELEGRAM_CHAT_ID`
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

---

## ⚠️ Important Notes

- ✅ **Button clicks work** - All 6 buttons are implemented
- ❌ **Direct replies don't work yet** - Replying to Telegram messages won't send to website
- ✅ **Templates work** - You can send pre-written responses
- ✅ **Webhook configured** - URL is set correctly

---

## 📖 Full Documentation

- `documentation/TELEGRAM_BUTTONS_STATUS.md` - Complete status report
- `documentation/TELEGRAM_BUTTON_TEST_GUIDE.md` - Detailed testing guide
- `documentation/VERCEL_LOGS_GUIDE.md` - How to debug with logs

---

## ✅ Success Checklist

- [ ] Run test script
- [ ] Receive test message in Telegram
- [ ] Click "Take Over" → See confirmation ✓
- [ ] Click "Quick Reply" → See templates ✓
- [ ] Click a template → Receive template message ✓
- [ ] Click "Back" → Return to main buttons ✓
- [ ] Click "Mark Resolved" → See resolved message ✓
- [ ] Click "View Full History" → See messages ✓

If all checked, buttons are working! 🎉
