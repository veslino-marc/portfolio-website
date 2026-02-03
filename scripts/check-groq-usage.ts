// Script to check Groq API usage from your database
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({ path: resolve(process.cwd(), '.env.local') });

import { supabaseAdmin } from '../app/lib/supabase';

async function checkGroqUsage() {
    console.log('📊 Checking Groq API Usage...\n');

    try {
        // Get today's date range
        const now = new Date();
        const startOfDay = new Date(now);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(now);
        endOfDay.setHours(23, 59, 59, 999);

        // Count AI messages today
        const { data: todayMessages, error } = await supabaseAdmin
            .from('messages')
            .select('id, created_at')
            .eq('sender_type', 'ai')
            .gte('created_at', startOfDay.toISOString())
            .lte('created_at', endOfDay.toISOString());

        if (error) throw error;

        const totalRequests = todayMessages?.length || 0;

        // Display results
        console.log('═══════════════════════════════════════════════');
        console.log('🤖 GROQ API USAGE REPORT');
        console.log('═══════════════════════════════════════════════\n');

        console.log('📅 Date:', now.toLocaleDateString());
        console.log('🕐 Time:', now.toLocaleTimeString());

        console.log('\n📊 USAGE TODAY:');
        console.log(`   Total AI Requests: ${totalRequests}`);

        // Free tier limits
        const DAILY_LIMIT = 14400;
        const MINUTE_LIMIT = 30;
        const percentageUsed = ((totalRequests / DAILY_LIMIT) * 100).toFixed(2);

        console.log(`   Daily Limit: ${DAILY_LIMIT.toLocaleString()} requests`);
        console.log(`   Remaining: ${(DAILY_LIMIT - totalRequests).toLocaleString()} requests`);
        console.log(`   Usage: ${percentageUsed}%`);

        // Status
        if (totalRequests > DAILY_LIMIT * 0.8) {
            console.log('\n⚠️  WARNING: You\'ve used over 80% of your daily quota!');
        } else if (totalRequests > DAILY_LIMIT * 0.5) {
            console.log('\n⚡ You\'ve used over 50% of your daily quota');
        } else {
            console.log('\n✅ You have plenty of quota remaining');
        }

        console.log('\n═══════════════════════════════════════════════');
        console.log('📖 GROQ FREE TIER LIMITS:');
        console.log('   • 30 requests per minute');
        console.log('   • 14,400 requests per day');
        console.log('   • Unlimited tokens');
        console.log('   • 100% FREE forever!');
        console.log('═══════════════════════════════════════════════\n');

        console.log('💡 Check real-time usage at:');
        console.log('   https://console.groq.com/usage\n');

        // Get hourly breakdown
        if (todayMessages && todayMessages.length > 0) {
            console.log('📈 HOURLY BREAKDOWN:');
            const hourlyData: { [key: string]: number } = {};

            todayMessages.forEach(msg => {
                const hour = new Date(msg.created_at).getHours();
                hourlyData[hour] = (hourlyData[hour] || 0) + 1;
            });

            Object.keys(hourlyData)
                .sort((a, b) => parseInt(a) - parseInt(b))
                .forEach(hour => {
                    const bar = '█'.repeat(Math.min(hourlyData[hour], 50));
                    console.log(`   ${hour.padStart(2, '0')}:00 - ${bar} (${hourlyData[hour]} requests)`);
                });
        }

        console.log('\n');

    } catch (error) {
        console.error('❌ Error checking usage:', error);
    }
}

checkGroqUsage();