# 🔧 Vercel Deployment Fix

## Issue
Deployment fails because environment variables are missing in Vercel.

## ✅ Solution: Add Environment Variables

### Step 1: Go to Vercel Dashboard
1. Open [vercel.com](https://vercel.com)
2. Select your project: **portfolio-website**
3. Click **Settings** tab
4. Click **Environment Variables** in the left sidebar

### Step 2: Add These Variables

Add each variable one by one:

#### Required Variables:

**1. GEMINI_API_KEY**
```
AIzaSyAHiKBqb6UNJJvLidphDDgc9aFHcLaDJvs
```
- Environment: Production, Preview, Development (select all)

**2. NEXT_PUBLIC_SUPABASE_URL**
```
https://pleylvdsythwxoamxzab.supabase.co
```
- Environment: Production, Preview, Development (select all)

**3. NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZXlsdmRzeXRod3hvYW14emFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTIzMzUsImV4cCI6MjA4NTM4ODMzNX0.iQREmArxlG_CpJcWx77FEcEGX0isPl6avG5tHcxHQuE
```
- Environment: Production, Preview, Development (select all)

**4. SUPABASE_SERVICE_ROLE_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsZXlsdmRzeXRod3hvYW14emFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTgxMjMzNSwiZXhwIjoyMDg1Mzg4MzM1fQ.PwDEGPPFHG2illP2RrP4kkE4NrCFE0EQCfbZF-a8Qoo
```
- Environment: Production, Preview, Development (select all)

**5. TELEGRAM_BOT_TOKEN**
```
8507420292:AAHsE0Kc_tagdSFyH1lMwPPNFJOicLedx5k
```
- Environment: Production, Preview, Development (select all)

**6. TELEGRAM_CHAT_ID**
```
8484273454
```
- Environment: Production, Preview, Development (select all)

**7. NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY** (Optional - for contact form)
```
88d778f4-0ec1-472d-a750-39340213df6e
```
- Environment: Production, Preview, Development (select all)

### Step 3: Redeploy

After adding all variables:

1. Go to **Deployments** tab
2. Click the **three dots (...)** on the failed deployment
3. Click **Redeploy**

OR

Push a new commit:
```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

### Step 4: Verify

Once deployed successfully:
1. Visit your site
2. Open the chatbot (bottom-right)
3. Test a message
4. Check if you receive Telegram notification

## 🎯 Quick Checklist

- [ ] All 7 environment variables added in Vercel
- [ ] Each variable set for Production, Preview, Development
- [ ] Redeployed after adding variables
- [ ] Deployment successful (green checkmark)
- [ ] Chatbot appears on site
- [ ] AI responds to messages
- [ ] Telegram notifications working

## 🚨 Common Issues

### Issue: Still failing after adding variables
**Solution:** Make sure you selected all three environments (Production, Preview, Development) for each variable.

### Issue: Chatbot not appearing
**Solution:** Hard refresh browser (Ctrl + Shift + R)

### Issue: AI not responding
**Solution:** Check Vercel logs for API errors. Verify GEMINI_API_KEY is correct.

### Issue: No Telegram notifications
**Solution:** 
1. Verify TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are correct
2. After deployment, run: `npx tsx scripts/setup-telegram-webhook.ts`

## 📝 Notes

- Environment variables are NOT committed to Git (they're in .env.local which is gitignored)
- You must add them manually in Vercel dashboard
- Changes to environment variables require a redeploy
- Never share these keys publicly

---

**Need help?** Check the deployment logs in Vercel for specific error messages.
