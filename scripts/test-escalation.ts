// Test script for escalation logic
// Run with: npx tsx scripts/test-escalation.ts

import { analyzeEscalation } from '../app/lib/escalation';

const testCases = [
    {
        name: 'Simple question - Should NOT escalate',
        context: {
            messageCount: 1,
            recentMessages: [],
            userMessage: 'What projects have you worked on?',
            aiResponse: 'Marc has worked on several projects including MindStack, SpendSense, and Blinders Vault.'
        }
    },
    {
        name: 'Hiring inquiry - Should escalate (HIGH)',
        context: {
            messageCount: 2,
            recentMessages: [],
            userMessage: 'I want to hire you for a custom project',
            aiResponse: 'That sounds great! Marc would love to discuss this with you.'
        }
    },
    {
        name: 'Explicit human request - Should escalate (HIGH)',
        context: {
            messageCount: 3,
            recentMessages: [],
            userMessage: 'Can I speak to Marc directly?',
            aiResponse: 'Of course! Let me connect you with Marc.'
        }
    },
    {
        name: 'Frustration - Should escalate (HIGH)',
        context: {
            messageCount: 4,
            recentMessages: [],
            userMessage: 'This is not helping me at all',
            aiResponse: 'I apologize for the confusion. Let me try to help better.'
        }
    },
    {
        name: 'Long conversation - Should escalate (MEDIUM)',
        context: {
            messageCount: 12,
            recentMessages: [],
            userMessage: 'Tell me more about your experience',
            aiResponse: 'Marc has 3 years of experience in web development.'
        }
    },
    {
        name: 'Complex query - Should escalate (MEDIUM)',
        context: {
            messageCount: 2,
            recentMessages: [],
            userMessage: 'I need a full-stack developer who can build a complex e-commerce platform with real-time inventory management, payment gateway integration, user authentication, admin dashboard, and mobile app support. Can you handle this kind of project and what would be your estimated timeline and cost?',
            aiResponse: 'Marc has experience with full-stack development and can definitely help with this.'
        }
    }
];

console.log('🧪 Testing Escalation Logic\n');
console.log('='.repeat(80));

testCases.forEach((test, index) => {
    console.log(`\n${index + 1}. ${test.name}`);
    console.log('-'.repeat(80));

    const result = analyzeEscalation(test.context);

    console.log(`📊 Result: ${result.shouldEscalate ? '🔴 ESCALATE' : '🟢 AI HANDLES'}`);
    console.log(`🎯 Confidence: ${Math.round(result.confidence * 100)}%`);
    console.log(`⚠️  Urgency: ${result.urgency.toUpperCase()}`);

    if (result.reasons.length > 0) {
        console.log(`📋 Reasons:`);
        result.reasons.forEach(reason => console.log(`   • ${reason}`));
    }

    console.log(`💬 User: "${test.context.userMessage.substring(0, 80)}${test.context.userMessage.length > 80 ? '...' : ''}"`);
});

console.log('\n' + '='.repeat(80));
console.log('✅ Test complete!\n');
