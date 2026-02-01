// Smart escalation logic - determines when to notify you
export interface EscalationCheck {
    shouldEscalate: boolean;
    confidence: number;
    reasons: string[];
    urgency: 'low' | 'medium' | 'high';
}

export interface ConversationContext {
    messageCount: number;
    recentMessages: Array<{ sender_type: string; message: string }>;
    userMessage: string;
    aiResponse: string;
}

export function analyzeEscalation(context: ConversationContext): EscalationCheck {
    const reasons: string[] = [];
    let confidence = 0.8; // Default high confidence
    let urgency: 'low' | 'medium' | 'high' = 'low';

    const userMsg = context.userMessage.toLowerCase();
    const aiMsg = context.aiResponse.toLowerCase();

    // 1. Explicit human request (HIGHEST PRIORITY)
    if (
        /speak to (you|marc|human|real person|owner)/i.test(userMsg) ||
        /talk to (you|marc|human|real person|owner)/i.test(userMsg) ||
        /contact (you|marc|owner)/i.test(userMsg) ||
        /i want to talk to/i.test(userMsg)
    ) {
        reasons.push('User explicitly requested human contact');
        confidence = 0.3;
        urgency = 'high';
    }

    // 2. Frustration detection
    if (
        /frustrated|angry|upset|annoyed|terrible|awful|useless/i.test(userMsg) ||
        /not helping|doesn't help|can't help/i.test(userMsg)
    ) {
        reasons.push('User frustration detected');
        confidence = 0.4;
        urgency = 'high';
    }

    // 3. Business/hiring inquiries (IMPORTANT)
    if (
        /hire|hiring|job|opportunity|position|work with|collaborate|project quote|budget|cost|price/i.test(userMsg)
    ) {
        reasons.push('Business/hiring inquiry - requires personal attention');
        confidence = 0.5;
        urgency = 'high';
    }

    // 4. Complex technical questions (long messages)
    if (context.userMessage.length > 300) {
        reasons.push('Complex query (long message)');
        confidence = Math.max(confidence - 0.2, 0.5);
        urgency = urgency === 'low' ? 'medium' : urgency;
    }

    // 5. Repeated similar questions
    const recentUserMessages = context.recentMessages
        .filter(m => m.sender_type === 'user')
        .map(m => m.message.toLowerCase());

    if (recentUserMessages.length >= 3) {
        const lastThree = recentUserMessages.slice(-3);
        const hasSimilarWords = lastThree.some((msg, i) =>
            lastThree.slice(i + 1).some(otherMsg => {
                const words1 = msg.split(' ').filter(w => w.length > 4);
                const words2 = otherMsg.split(' ').filter(w => w.length > 4);
                const commonWords = words1.filter(w => words2.includes(w));
                return commonWords.length >= 2;
            })
        );

        if (hasSimilarWords) {
            reasons.push('User asking similar questions repeatedly');
            confidence = 0.6;
            urgency = 'medium';
        }
    }

    // 6. AI uncertainty indicators
    if (
        /i'm not sure|i don't know|i cannot|i can't help with that|beyond my knowledge/i.test(aiMsg) ||
        /you might want to contact|reach out to marc directly/i.test(aiMsg)
    ) {
        reasons.push('AI expressed uncertainty');
        confidence = 0.5;
        urgency = 'medium';
    }

    // 7. Sensitive topics
    if (
        /payment|refund|complaint|legal|contract|nda|confidential|private/i.test(userMsg)
    ) {
        reasons.push('Sensitive topic detected');
        confidence = 0.4;
        urgency = 'high';
    }

    // 8. Long conversation (might need human touch)
    if (context.messageCount > 10) {
        reasons.push('Long conversation - might benefit from human interaction');
        confidence = Math.max(confidence - 0.1, 0.6);
        urgency = urgency === 'low' ? 'medium' : urgency;
    }

    // 9. Specific project/custom work requests
    if (
        /custom (project|work|development)|specific (needs|requirements)|unique (project|solution)/i.test(userMsg)
    ) {
        reasons.push('Custom project inquiry');
        confidence = 0.5;
        urgency = 'high';
    }

    // Decision: Escalate if confidence is below 0.7
    const shouldEscalate = confidence < 0.7 || reasons.length > 0;

    return {
        shouldEscalate,
        confidence,
        reasons,
        urgency
    };
}

// Calculate confidence score for analytics
export function calculateConfidenceScore(
    userMessage: string,
    aiResponse: string
): number {
    const context: ConversationContext = {
        messageCount: 1,
        recentMessages: [],
        userMessage,
        aiResponse
    };

    const analysis = analyzeEscalation(context);
    return analysis.confidence;
}
