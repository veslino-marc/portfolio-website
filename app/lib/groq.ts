// Groq AI configuration
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY!
});

export async function generateAIResponse(
    userMessage: string,
    conversationHistory: { role: string; content: string }[] = [],
    userProfile?: { name?: string; email?: string; previousTopics?: string[] }
): Promise<string> {
    try {
        console.log('🤖 Generating AI response with Groq for:', userMessage);
        console.log('📚 Conversation history length:', conversationHistory.length);

        // Build context about Marc
        const systemPrompt = `You are a helpful AI assistant for Marc Vesliño's portfolio website.

About Marc:
- 3rd year IT student at PUP-Taguig
- Frontend Web Developer
- Skills: React, Next.js, Angular, Spring Boot, Node.js, TypeScript, JavaScript, Java, Python, C++, PHP, Tailwind CSS, MySQL, SQL Server
- Projects: 
  * MindStack - AI-powered learning platform with Angular and Spring Boot
  * SpendSense - Smart budgeting mobile app using the 50/30/20 rule (50% needs, 30% wants, 20% savings)
  * Blinders Vault - Secure banking system with OTP (One-Time Password) verification
  * Eventure - Complete event management system with real-time tracking (Desktop App)
  * YouthConnect - SK governance platform for youth engagement (Web App)
  * SmileSync - Dental appointment management system (Desktop App)
- Contact: marcveslino000@gmail.com
- GitHub: github.com/veslino-marc
- LinkedIn: linkedin.com/in/marcvesliño
- Portfolio: https://portfolio-website-marcveslino.vercel.app
- Open to: Internships, freelance projects, collaborations
${userProfile?.name ? `\n\nYou are talking to: ${userProfile.name}` : ''}

IMPORTANT INSTRUCTIONS:
1. Keep responses concise (2-4 sentences) unless listing projects/skills
2. Be friendly and conversational
3. If asked about projects, list ALL SIX projects
4. If asked about skills, organize by category (Frontend, Backend, Languages, Database)
5. If asked about availability, mention he's open to internships, freelance, and collaborations
6. Reference previous conversation naturally when relevant`;

        // Build messages array
        const messages: any[] = [
            { role: 'system', content: systemPrompt }
        ];

        // Add conversation history (last 6 messages for context)
        const recentHistory = conversationHistory.slice(-6);
        for (const msg of recentHistory) {
            messages.push({
                role: msg.role === 'user' ? 'user' : 'assistant',
                content: msg.content
            });
        }

        // Add current user message
        messages.push({
            role: 'user',
            content: userMessage
        });

        // Call Groq API
        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile', // Fast and high quality
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 1,
        });

        const response = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        console.log('✅ Groq AI response generated successfully');
        console.log('📝 Response preview:', response.substring(0, 100) + '...');
        console.log('🤖 Model: llama-3.3-70b-versatile');

        return response;

    } catch (error: any) {
        console.error('❌ Groq AI Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));

        // Return fallback response
        console.log('⚠️ Using fallback response');
        return getFallbackResponse(userMessage, conversationHistory);
    }
}

// Fallback responses (same as before)
function getFallbackResponse(userMessage: string, conversationHistory?: { role: string; content: string }[]): string {
    const lowerMessage = userMessage.toLowerCase();

    // Projects
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('built')) {
        return "Marc has worked on several impressive projects including:\n\n• MindStack - An AI-powered learning platform with Angular and Spring Boot\n• SpendSense - A smart budgeting mobile app using the 50/30/20 rule\n• Blinders Vault - A secure banking system with OTP verification\n• Eventure - Complete event management system with real-time tracking\n• YouthConnect - SK governance platform for youth engagement\n• SmileSync - Dental appointment management system\n\nWould you like to know more about any specific project?";
    }

    // Skills
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
        return "Marc specializes in:\n\n• Frontend: React, Next.js, Angular, Tailwind CSS\n• Backend: Spring Boot, Node.js, PHP\n• Languages: TypeScript, JavaScript, Java, Python, C++\n• Databases: MySQL, SQL Server\n\nHe's experienced in full-stack development! Want to know more about any specific skill?";
    }

    // Greetings
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! I'm Marc's AI assistant. I can help you learn about his projects, skills, and experience. What would you like to know?";
    }

    // Contact
    if (lowerMessage.includes('email') || lowerMessage.includes('contact') || lowerMessage.includes('reach')) {
        return "You can reach Marc at:\n\n📧 Email: marcveslino000@gmail.com\n💼 LinkedIn: linkedin.com/in/marcvesliño\n🐙 GitHub: github.com/veslino-marc\n🌐 Portfolio: https://portfolio-website-marcveslino.vercel.app\n\nHe's open to opportunities and collaborations!";
    }

    // Availability
    if (lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('freelance')) {
        return "Marc is currently a 3rd year IT student at PUP-Taguig and is open to:\n\n• Internship opportunities\n• Freelance projects\n• Collaborations\n\nFeel free to reach out at marcveslino000@gmail.com!";
    }

    // Generic fallback
    return "I'm Marc's AI assistant! I can help you learn about his projects, skills, and experience. Marc is a 3rd year IT student specializing in React, Next.js, and Angular. Feel free to ask me anything, or contact Marc directly at marcveslino000@gmail.com!";
}