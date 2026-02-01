# How to Check Vercel Logs for Telegram Webhook

## Why Check Logs?
When Telegram buttons don't work, the logs will show you:
- If the webhook is receiving button clicks
- Any errors in the button handling code
- Database connection issues
- What data is being sent/received

## How to Access Vercel Logs

### Method 1: Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Click on your project: `portfolio-website-marcveslino`
3. Click on the "Logs" tab at the top
4. You'll see real-time logs of all requests

### Method 2: Vercel CLI (Real-time)
```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Login to Vercel
vercel login

# View real-time logs
vercel logs --follow
```

## What to Look For

### ✅ Successful Button Click
```
📥 Telegram webhook received: {
  "update_id": 123456789,
  "callback_query": {
    "id": "abc123",
    "data": "takeover_conv_123",
    ...
  }
}
🔘 Button clicked: takeover
✅ Action processed
```

### ❌ Error Examples

**1. Webhook not receiving data:**
```
No logs appear when clicking buttons
```
**Solution:** Webhook URL might be wrong. Run `npx tsx scripts/setup-telegram-webhook.ts`

**2. Database error:**
```
❌ Telegram webhook error: Error: Invalid API key
```
**Solution:** Check Supabase environment variables in Vercel

**3. Conversation not found:**
```
❌ No conversation history found
```
**Solution:** The conversation ID might be wrong or expired

**4. Bot token error:**
```
❌ Error: 401 Unauthorized
```
**Solution:** Check TELEGRAM_BOT_TOKEN in Vercel environment variables

## Testing Workflow

1. **Open Vercel logs** (keep them visible)
2. **Click a Telegram button**
3. **Watch the logs** for activity
4. **Look for errors** (lines starting with ❌)
5. **Check the data** being received

## Common Issues and Solutions

### Issue: No logs appear
**Cause:** Webhook not configured or wrong URL
**Solution:**
```bash
npx tsx scripts/setup-telegram-webhook.ts
```

### Issue: "Invalid API key" error
**Cause:** Supabase credentials wrong
**Solution:**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Verify these are correct:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

### Issue: "Conversation not found"
**Cause:** Test conversation doesn't exist in database
**Solution:** This is normal for test messages. Real escalations will work.

### Issue: Buttons show loading forever
**Cause:** Webhook not responding with 200 OK
**Solution:** Check logs for errors in the webhook handler

## Log Filtering Tips

In Vercel Dashboard logs, you can filter by:
- **Path:** `/api/telegram/webhook` (only webhook requests)
- **Status:** `200` (successful) or `500` (errors)
- **Time:** Last hour, last day, etc.

## Example: Debugging "Take Over" Button

1. Click "✅ Take Over" in Telegram
2. Check Vercel logs for:
   ```
   📥 Telegram webhook received
   🔘 Button clicked: takeover
   ```
3. If you see this, the webhook is working
4. If you see an error after, that's where the problem is
5. Common errors:
   - Database connection failed
   - Conversation ID not found
   - Bot token invalid

## Quick Debug Commands

```bash
# Test webhook configuration
npx tsx scripts/setup-telegram-webhook.ts

# Send test message with buttons
npx tsx scripts/test-telegram-buttons.ts

# Check if bot token is valid
curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe

# Check webhook status
curl https://api.telegram.org/bot<YOUR_TOKEN>/getWebhookInfo
```

## Real-time Monitoring

For active debugging:
1. Open Vercel logs in one window
2. Open Telegram in another window
3. Click buttons and watch logs update in real-time
4. This helps you see exactly what's happening

## What Success Looks Like

When everything works, you should see:
```
📥 Telegram webhook received: {...}
🔘 Button clicked: takeover
✅ Action processed
```

And in Telegram:
- Button shows checkmark ✓
- Message updates or new message appears
- No error messages

## Need More Help?

If logs show errors you don't understand:
1. Copy the full error message
2. Check the line number in the error
3. Look at that line in `app/api/telegram/webhook/route.ts`
4. Common fixes:
   - Restart Vercel deployment
   - Re-add environment variables
   - Re-configure webhook
