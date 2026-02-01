// Script to setup Telegram webhook
// Run with: npx tsx scripts/setup-telegram-webhook.ts

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const WEBHOOK_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://portfolio-website-marcveslino.vercel.app';

async function setupWebhook() {
    if (!TELEGRAM_BOT_TOKEN) {
        console.error('❌ TELEGRAM_BOT_TOKEN not found in environment variables');
        process.exit(1);
    }

    const webhookEndpoint = `${WEBHOOK_URL}/api/telegram/webhook`;

    console.log('🔧 Setting up Telegram webhook...');
    console.log('📍 Webhook URL:', webhookEndpoint);

    try {
        // Set webhook
        const response = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: webhookEndpoint,
                    allowed_updates: ['message', 'callback_query']
                })
            }
        );

        const data = await response.json();

        if (data.ok) {
            console.log('✅ Webhook set successfully!');
            console.log('📊 Response:', data);
        } else {
            console.error('❌ Failed to set webhook:', data);
        }

        // Get webhook info
        const infoResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
        );
        const info = await infoResponse.json();

        console.log('\n📋 Current webhook info:');
        console.log(JSON.stringify(info.result, null, 2));

    } catch (error) {
        console.error('❌ Error setting up webhook:', error);
    }
}

setupWebhook();
