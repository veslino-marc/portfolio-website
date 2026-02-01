// Quick script to check Telegram webhook status
// Run with: npx tsx scripts/check-webhook-status.ts

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

async function checkWebhookStatus() {
    if (!TELEGRAM_BOT_TOKEN) {
        console.error('❌ TELEGRAM_BOT_TOKEN not found in environment variables');
        process.exit(1);
    }

    console.log('🔍 Checking Telegram webhook status...\n');

    try {
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
        );
        const data = await response.json();

        if (!data.ok) {
            console.error('❌ Failed to get webhook info:', data);
            return;
        }

        const info = data.result;

        console.log('📊 Webhook Status Report');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

        // Webhook URL
        if (info.url) {
            console.log('✅ Webhook URL:', info.url);
        } else {
            console.log('❌ Webhook URL: Not set');
            console.log('   Run: npx tsx scripts/setup-telegram-webhook.ts');
        }

        // Pending updates
        const pendingCount = info.pending_update_count || 0;
        if (pendingCount > 0) {
            console.log(`⚠️  Pending updates: ${pendingCount}`);
            console.log('   (These are unprocessed button clicks/messages)');
        } else {
            console.log('✅ Pending updates: 0');
        }

        // Last error
        if (info.last_error_message) {
            console.log('\n❌ Last Error:');
            console.log(`   Message: ${info.last_error_message}`);
            console.log(`   Date: ${new Date(info.last_error_date * 1000).toLocaleString()}`);
            console.log('\n   Common causes:');
            console.log('   • Webhook URL is unreachable');
            console.log('   • Webhook returned non-200 status');
            console.log('   • Webhook took too long to respond (>60s)');
        } else {
            console.log('✅ No errors');
        }

        // Allowed updates
        if (info.allowed_updates && info.allowed_updates.length > 0) {
            console.log('\n📋 Allowed updates:', info.allowed_updates.join(', '));
        }

        // Max connections
        if (info.max_connections) {
            console.log(`🔗 Max connections: ${info.max_connections}`);
        }

        // IP address
        if (info.ip_address) {
            console.log(`🌐 IP address: ${info.ip_address}`);
        }

        // Summary
        console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📝 Summary:');

        const isConfigured = !!info.url;
        const hasErrors = !!info.last_error_message;
        const hasPending = pendingCount > 0;

        if (isConfigured && !hasErrors && !hasPending) {
            console.log('✅ Everything looks good!');
            console.log('   Your webhook is properly configured and working.');
        } else {
            console.log('⚠️  Issues detected:');
            if (!isConfigured) console.log('   • Webhook not configured');
            if (hasErrors) console.log('   • Recent errors detected');
            if (hasPending) console.log('   • Unprocessed updates pending');
        }

        console.log('\n🎯 Next Steps:');
        if (!isConfigured) {
            console.log('   1. Run: npx tsx scripts/setup-telegram-webhook.ts');
        } else if (hasErrors) {
            console.log('   1. Check Vercel logs for detailed errors');
            console.log('   2. Verify environment variables in Vercel');
            console.log('   3. Test webhook: npx tsx scripts/test-telegram-buttons.ts');
        } else {
            console.log('   1. Test buttons: npx tsx scripts/test-telegram-buttons.ts');
            console.log('   2. Check Vercel logs if buttons don\'t work');
        }

    } catch (error) {
        console.error('❌ Error checking webhook status:', error);
    }
}

checkWebhookStatus();
