// Script to test Telegram webhook and button functionality
// Run with: npx tsx scripts/test-telegram-buttons.ts

import { config } from 'dotenv';
import { resolve } from 'path';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

async function testTelegramButtons() {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
        console.error('❌ Missing environment variables');
        console.error('Required: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID');
        process.exit(1);
    }

    console.log('🧪 Testing Telegram Bot Configuration...\n');

    try {
        // 1. Test bot token
        console.log('1️⃣ Testing bot token...');
        const meResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe`
        );
        const meData = await meResponse.json();

        if (meData.ok) {
            console.log('✅ Bot token valid');
            console.log(`   Bot name: ${meData.result.first_name}`);
            console.log(`   Bot username: @${meData.result.username}`);
        } else {
            console.error('❌ Invalid bot token');
            return;
        }

        // 2. Check webhook status
        console.log('\n2️⃣ Checking webhook status...');
        const webhookResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getWebhookInfo`
        );
        const webhookData = await webhookResponse.json();

        if (webhookData.ok) {
            const info = webhookData.result;
            console.log('✅ Webhook info retrieved');
            console.log(`   URL: ${info.url || 'Not set'}`);
            console.log(`   Pending updates: ${info.pending_update_count || 0}`);
            console.log(`   Last error: ${info.last_error_message || 'None'}`);
            console.log(`   Last error date: ${info.last_error_date ? new Date(info.last_error_date * 1000).toLocaleString() : 'N/A'}`);

            if (!info.url) {
                console.warn('⚠️  Webhook URL not set! Run setup-telegram-webhook.ts');
            }
        }

        // 3. Send test message with buttons
        console.log('\n3️⃣ Sending test message with buttons...');
        const testConvId = `test_${Date.now()}`;

        const testMessage = `
🧪 *TEST MESSAGE*

This is a test to verify all buttons work correctly.

Click each button to test:
1. ✅ Take Over
2. 📝 Quick Reply
3. ✔️ Mark Resolved
4. 📊 View Full History
5. 💼 Business Inquiry
6. 🤝 Collaboration

🆔 Test Conversation: \`${testConvId}\`
`;

        const sendResponse = await fetch(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: TELEGRAM_CHAT_ID,
                    text: testMessage,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '✅ Take Over', callback_data: `takeover_${testConvId}` },
                                { text: '📝 Quick Reply', callback_data: `reply_${testConvId}` }
                            ],
                            [
                                { text: '✔️ Mark Resolved', callback_data: `resolve_${testConvId}` },
                                { text: '📊 View Full History', callback_data: `history_${testConvId}` }
                            ],
                            [
                                { text: '💼 Business Inquiry', callback_data: `template_business_${testConvId}` },
                                { text: '🤝 Collaboration', callback_data: `template_collab_${testConvId}` }
                            ]
                        ]
                    }
                })
            }
        );

        const sendData = await sendResponse.json();

        if (sendData.ok) {
            console.log('✅ Test message sent successfully!');
            console.log(`   Message ID: ${sendData.result.message_id}`);
            console.log('\n📱 Check your Telegram and click the buttons to test!');
        } else {
            console.error('❌ Failed to send test message:', sendData);
        }

        // 4. Summary
        console.log('\n📊 Test Summary:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('✅ Bot token: Valid');
        console.log(`${webhookData.result.url ? '✅' : '❌'} Webhook: ${webhookData.result.url ? 'Configured' : 'Not set'}`);
        console.log('✅ Test message: Sent');
        console.log('\n🎯 Next Steps:');
        console.log('1. Open Telegram and find the test message');
        console.log('2. Click each button and verify it works');
        console.log('3. Check Vercel logs for webhook activity');
        console.log('4. Refer to TELEGRAM_BUTTON_TEST_GUIDE.md for detailed testing');

    } catch (error) {
        console.error('❌ Error during testing:', error);
    }
}

testTelegramButtons();
