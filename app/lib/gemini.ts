// Gemini AI configuration - COMPREHENSIVE FALLBACK
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Ultra-comprehensive fallback covering ALL possible questions
function getFallbackResponse(userMessage: string, conversationHistory?: { role: string; content: string }[]): string {
    const lowerMessage = userMessage.toLowerCase();

    // PRIORITY 1: Check conversation history for context
    if (conversationHistory && conversationHistory.length > 0) {
        const lastAssistantMsg = conversationHistory.slice().reverse().find(msg => msg.role === 'assistant');

        if (lastAssistantMsg) {
            const lastContent = lastAssistantMsg.content;

            // Handle "What is [term]?" questions based on what was just mentioned
            if (lowerMessage.startsWith('what is') || lowerMessage.startsWith('what\'s')) {
                // Extract the term being asked about
                const term = lowerMessage.replace(/^what is |^what's /i, '').replace(/\?/g, '').trim();

                // Check if this term was mentioned in the last message
                if (lastContent.includes('50/30/20') && (term.includes('50') || term.includes('rule') || term.includes('30') || term.includes('20'))) {
                    return "The 50/30/20 rule is a budgeting guideline: allocate 50% of income to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. SpendSense automates this for users!";
                }

                if ((lastContent.includes('OTP') || lastContent.includes('Blinders Vault')) && (term.includes('otp') || term.includes('verification'))) {
                    return "OTP stands for One-Time Password - a unique security code generated for each login or transaction. Even if someone knows your password, they can't access your account without the OTP. This makes Blinders Vault highly secure!";
                }

                if (lastContent.includes('AI-powered') && (term.includes('ai') || term.includes('powered'))) {
                    return "MindStack's AI analyzes how each student learns and adapts content to their learning style. It tracks progress, identifies weak areas, and provides personalized recommendations to help students learn more effectively!";
                }

                // If asking about something not in Marc's portfolio
                if (!lastContent.toLowerCase().includes(term.toLowerCase())) {
                    // But first check if it's a known skill/tech that should be answered
                    const skillTerms = ['java', 'python', 'react', 'angular', 'node', 'typescript', 'javascript', 'mysql', 'spring', 'tailwind', 'c++'];
                    const isSkillTerm = skillTerms.some(skill => term.toLowerCase().includes(skill));

                    if (!isSkillTerm) {
                        return `I don't have information about "${term}" in Marc's portfolio. I can tell you about his projects (MindStack, SpendSense, Blinders Vault, Eventure, YouthConnect, SmileSync), skills, or experience. What would you like to know?`;
                    }
                }
            }

            // Handle questions about concepts/terms just mentioned (alternative phrasing)
            if (lastContent.includes('50/30/20') && (lowerMessage.includes('50') || lowerMessage.includes('rule') || lowerMessage.includes('what'))) {
                return "The 50/30/20 rule is a budgeting guideline: allocate 50% of income to needs (rent, food, utilities), 30% to wants (entertainment, dining out), and 20% to savings and debt repayment. SpendSense automates this for users!";
            }

            if ((lastContent.includes('OTP') || lastContent.includes('Blinders Vault')) && (lowerMessage.includes('otp') || (lowerMessage.includes('what') && lowerMessage.includes('verification')))) {
                return "OTP stands for One-Time Password - a unique security code generated for each login or transaction. Even if someone knows your password, they can't access your account without the OTP. This makes Blinders Vault highly secure!";
            }

            if (lastContent.includes('AI-powered') && (lowerMessage.includes('ai') || lowerMessage.includes('how') || lowerMessage.includes('work'))) {
                return "MindStack's AI analyzes how each student learns and adapts content to their learning style. It tracks progress, identifies weak areas, and provides personalized recommendations to help students learn more effectively!";
            }

            // Declare project variables for context checking
            const hasMindStack = lastContent.includes('MindStack');
            const hasSpendSense = lastContent.includes('SpendSense');
            const hasBlindersVault = lastContent.includes('Blinders Vault');

            // Handle skills follow-up
            const hasSkills = lastContent.includes('Frontend') || lastContent.includes('Backend') || lastContent.includes('specializes');
            if (hasSkills) {
                // Check for specific skill mentions
                if (lowerMessage.includes('typescript') || lowerMessage.includes('type script')) return "Marc is proficient in TypeScript! It's his preferred language for type-safe development, better code quality, and catching errors early. He uses it across all his projects for better developer experience.";
                if (lowerMessage.includes('react')) return "Marc has extensive experience with React! He builds modern, interactive UIs using React hooks, state management, and component architecture. He integrates React with Next.js for server-side rendering.";
                if (lowerMessage.includes('next') || lowerMessage.includes('nextjs') || lowerMessage.includes('next.js')) return "Marc specializes in Next.js! He uses it for fast, SEO-friendly web apps with SSR and static generation. This portfolio is built with Next.js!";
                if (lowerMessage.includes('angular')) return "Marc is skilled in Angular! He built MindStack with it. He's comfortable with component architecture, TypeScript integration, and RxJS for reactive programming.";
                if (lowerMessage.includes('spring') || lowerMessage.includes('boot')) return "Marc uses Spring Boot for backend development! He builds REST APIs, handles authentication, and manages databases. He used it for MindStack's backend.";
                if (lowerMessage.includes('node') || lowerMessage.includes('nodejs') || lowerMessage.includes('node.js')) return "Marc works with Node.js for backend development! He builds scalable server-side applications and APIs, using JavaScript across the full stack.";
                if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) return "Marc is highly skilled in JavaScript! It's the foundation of his work. He uses modern ES6+ features and is comfortable with vanilla JS and frameworks.";
                if ((lowerMessage.includes('java') && !lowerMessage.includes('javascript')) || lowerMessage === 'java' || lowerMessage === 'java?') return "Marc has experience with Java! He uses it with Spring Boot for backend development. Java's strong typing makes it great for robust server applications.";
                if (lowerMessage.includes('python')) return "Marc knows Python! He uses it for scripting, automation, and backend development. Python's simplicity makes it versatile for various tasks.";
                if (lowerMessage.includes('c++')) return "Marc has experience with C++! He learned it for systems programming and algorithms. C++ gives him a strong foundation in low-level concepts.";
                if (lowerMessage.includes('tailwind')) return "Marc uses Tailwind CSS! It's his go-to utility-first framework for building responsive, modern interfaces quickly. This portfolio uses Tailwind!";
                if (lowerMessage.includes('mysql')) return "Marc works with MySQL for database management! He designs schemas, writes queries, and manages relational data efficiently.";
                if (lowerMessage.includes('sql server')) return "Marc has experience with SQL Server! He uses it for enterprise-level database management, stored procedures, and complex queries.";

                // Handle "languages" or "programming languages" question
                if (lowerMessage.includes('language') || lowerMessage === 'languages') {
                    return "Marc is proficient in multiple programming languages:\n\n• TypeScript - His preferred language for type-safe development\n• JavaScript - Foundation of his full-stack work\n• Java - Used with Spring Boot for backend\n• Python - For scripting and automation\n• C++ - Systems programming and algorithms\n\nHe uses these languages across his various projects!";
                }
            }

            // Handle project follow-ups - PRIORITY: Check if user mentions specific project name
            if (lowerMessage.includes('mindstack')) {
                return "MindStack is an AI-powered learning platform built with Angular and Spring Boot. It helps students learn through personalized AI recommendations that adapt to each student's learning style!";
            }
            if (lowerMessage.includes('spendsense') || lowerMessage.includes('spend sense')) {
                return "SpendSense is a smart budgeting app implementing the 50/30/20 rule - 50% needs, 30% wants, 20% savings. It features expense tracking, budget visualization, and financial insights!";
            }
            if (lowerMessage.includes('blinders') || lowerMessage.includes('vault')) {
                return "Blinders Vault is a secure banking system with OTP verification. It ensures only authorized users can access accounts, demonstrating Marc's understanding of secure authentication and encryption!";
            }
            if (lowerMessage.includes('eventure')) {
                return "Eventure is a complete event management system with role-based access for attendees and organizers. It features real-time attendance tracking, session management, event notifications, and post-event feedback!";
            }
            if (lowerMessage.includes('youthconnect') || lowerMessage.includes('youth connect')) {
                return "YouthConnect is an SK governance platform connecting officials with youth members. It supports announcements, event management, concern submissions, and project transparency with real-time updates!";
            }
            if (lowerMessage.includes('smilesync') || lowerMessage.includes('smile sync')) {
                return "SmileSync is a dental appointment management system with dual portals for patients and dentists. Patients can schedule appointments and select procedures, while dentists manage schedules and patient information!";
            }

            // Ordinal numbers (first, second, third) - check for "more about" or "tell me"
            if ((lowerMessage.includes('first') || lowerMessage.includes('1st')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (hasMindStack) {
                    return "MindStack is an AI-powered learning platform built with Angular and Spring Boot. It helps students learn through personalized AI recommendations that adapt to each student's learning style!";
                }
            }
            if ((lowerMessage.includes('second') || lowerMessage.includes('2nd')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (hasSpendSense) {
                    return "SpendSense is a smart budgeting app implementing the 50/30/20 rule - 50% needs, 30% wants, 20% savings. It features expense tracking, budget visualization, and financial insights!";
                }
            }
            if ((lowerMessage.includes('third') || lowerMessage.includes('3rd')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (hasBlindersVault) {
                    return "Blinders Vault is a secure banking system with OTP verification. It ensures only authorized users can access accounts, demonstrating Marc's understanding of secure authentication!";
                }
            }
            if ((lowerMessage.includes('fourth') || lowerMessage.includes('4th')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (lastContent.includes('Eventure')) {
                    return "Eventure is a complete event management system with role-based access for attendees and organizers. It features real-time attendance tracking, session management, and post-event feedback!";
                }
            }
            if ((lowerMessage.includes('fifth') || lowerMessage.includes('5th')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (lastContent.includes('YouthConnect')) {
                    return "YouthConnect is an SK governance platform connecting officials with youth members. It supports announcements, event management, and project transparency!";
                }
            }
            if ((lowerMessage.includes('sixth') || lowerMessage.includes('6th')) && (lowerMessage.includes('more') || lowerMessage.includes('tell') || lowerMessage.includes('one'))) {
                if (lastContent.includes('SmileSync')) {
                    return "SmileSync is a dental appointment management system with dual portals for patients and dentists for scheduling and procedure management!";
                }
            }
        }
    }

    // PRIORITY 2: Handle ALL possible question variations

    // Projects (HIGHEST PRIORITY - check before greetings)
    if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('built') ||
        lowerMessage.includes('made') || lowerMessage.includes('created') || lowerMessage.includes('developed') ||
        lowerMessage.includes('showcase') || lowerMessage.includes('app')) {
        return "Marc has worked on several impressive projects including:\n\n• MindStack - An AI-powered learning platform with Angular and Spring Boot\n• SpendSense - A smart budgeting mobile app using the 50/30/20 rule\n• Blinders Vault - A secure banking system with OTP verification\n• Eventure - Complete event management system with real-time tracking\n• YouthConnect - SK governance platform for youth engagement\n• SmileSync - Dental appointment management system\n\nWould you like to know more about any specific project?";
    }

    // Skills/Technologies (HIGH PRIORITY)
    if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech') ||
        lowerMessage.includes('know') || lowerMessage.includes('language') || lowerMessage.includes('framework') ||
        lowerMessage.includes('tool') || lowerMessage.includes('stack') || lowerMessage.includes('expertise') ||
        lowerMessage.includes('proficient') || lowerMessage.includes('good at') || lowerMessage.includes('specialize') ||
        (lowerMessage.includes('what') && (lowerMessage.includes('your') || lowerMessage.includes('his')) &&
            (lowerMessage.includes('skill') || lowerMessage.includes('tech') || lowerMessage.includes('know')))) {
        return "Marc specializes in:\n\n• Frontend: React, Next.js, Angular, Tailwind CSS\n• Backend: Spring Boot, Node.js\n• Languages: TypeScript, JavaScript, Java, Python, C++\n• Databases: MySQL, SQL Server\n\nHe's experienced in full-stack development! Want to know more about any specific skill?";
    }

    // Experience/Background (ALL variations) - HIGH PRIORITY
    if ((lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about him') ||
        lowerMessage.includes('about marc') || lowerMessage.includes('who is') ||
        lowerMessage.includes('biography') || lowerMessage.includes('bio') || lowerMessage.includes('story') ||
        lowerMessage.includes('journey') || lowerMessage.includes('career')) &&
        !lowerMessage.includes('project') && !lowerMessage.includes('skill')) {
        return "Marc Vesliño is a 3rd year IT student at PUP-Taguig with hands-on experience in full-stack development. He's built multiple production-ready projects using modern technologies like React, Next.js, Angular, and Spring Boot. He specializes in creating AI-powered applications and secure systems. Currently open to internships, freelance work, and collaborations!";
    }

    // Greetings (only if no other keywords)
    if ((lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey') ||
        lowerMessage.includes('good morning') || lowerMessage.includes('good afternoon') || lowerMessage.includes('good evening')) &&
        !lowerMessage.includes('project') && !lowerMessage.includes('skill')) {
        return "Hello! I'm Marc's AI assistant. I can help you learn about his projects, skills, and experience. What would you like to know?";
    }

    if (lowerMessage.includes('how are you') || lowerMessage.includes('how r u') || lowerMessage.includes('how do you do')) {
        return "I'm doing great, thanks for asking! I'm here to help you learn about Marc Vesliño - his projects, skills, and experience. What would you like to know?";
    }

    if (lowerMessage.includes('who are you') || lowerMessage.includes('what are you') || lowerMessage.includes('introduce yourself')) {
        return "I'm Marc's AI assistant! I help visitors learn about Marc's projects, skills, and experience. Marc is a 3rd year IT student specializing in React, Next.js, and Angular. What would you like to know about him?";
    }

    // Contact/Social Media (ALL variations)
    if (lowerMessage.includes('email') || lowerMessage.includes('contact') || lowerMessage.includes('reach') ||
        lowerMessage.includes('github') || lowerMessage.includes('linkedin') || lowerMessage.includes('social') ||
        lowerMessage.includes('portfolio') || lowerMessage.includes('website') || lowerMessage.includes('link') ||
        lowerMessage.includes('how to find') || lowerMessage.includes('where to find') || lowerMessage.includes('account')) {
        return "You can reach Marc at:\n\n📧 Email: marcveslino000@gmail.com\n💼 LinkedIn: linkedin.com/in/marcvesliño\n🐙 GitHub: github.com/veslino-marc\n🌐 Portfolio: https://portfolio-website-marcveslino.vercel.app\n\nHe's open to opportunities and collaborations!";
    }

    // Experience/Background (ALL variations) - but not if asking about projects/skills
    if ((lowerMessage.includes('experience') || lowerMessage.includes('background') || lowerMessage.includes('about him') ||
        lowerMessage.includes('about marc') || lowerMessage.includes('who is') ||
        lowerMessage.includes('biography') || lowerMessage.includes('bio') || lowerMessage.includes('story') ||
        lowerMessage.includes('journey') || lowerMessage.includes('career')) &&
        !lowerMessage.includes('project') && !lowerMessage.includes('skill')) {
        return "Marc Vesliño is a 3rd year IT student at PUP-Taguig with hands-on experience in full-stack development. He's built multiple production-ready projects using modern technologies like React, Next.js, Angular, and Spring Boot. He specializes in creating AI-powered applications and secure systems. Currently open to internships, freelance work, and collaborations!";
    }

    // Hiring/Availability (ALL variations)
    if (lowerMessage.includes('hire') || lowerMessage.includes('available') || lowerMessage.includes('freelance') ||
        lowerMessage.includes('work with') || lowerMessage.includes('collaborate') || lowerMessage.includes('opportunity') ||
        lowerMessage.includes('job') || lowerMessage.includes('position') || lowerMessage.includes('opening') ||
        lowerMessage.includes('recruit') || lowerMessage.includes('looking for') || lowerMessage.includes('seeking')) {
        return "Marc is currently a 3rd year IT student at PUP-Taguig and is open to:\n\n• Internship opportunities\n• Freelance projects\n• Collaborations\n\nFeel free to reach out at marcveslino000@gmail.com!";
    }

    // Education
    if (lowerMessage.includes('school') || lowerMessage.includes('university') || lowerMessage.includes('college') ||
        lowerMessage.includes('education') || lowerMessage.includes('student') || lowerMessage.includes('study') ||
        lowerMessage.includes('degree') || lowerMessage.includes('major')) {
        return "Marc is currently a 3rd year IT (Information Technology) student at PUP-Taguig (Polytechnic University of the Philippines - Taguig). He's actively building real-world projects while studying!";
    }

    // Location
    if (lowerMessage.includes('where') || lowerMessage.includes('location') || lowerMessage.includes('based') ||
        lowerMessage.includes('from') || lowerMessage.includes('live')) {
        return "Marc is based in Taguig, Philippines. He's studying at PUP-Taguig and is open to remote work opportunities worldwide!";
    }

    // Age/Personal
    if (lowerMessage.includes('age') || lowerMessage.includes('old') || lowerMessage.includes('young')) {
        return "Marc is a 3rd year college student pursuing IT at PUP-Taguig. He's focused on building his skills and creating impressive projects!";
    }

    // Hobbies/Interests
    if (lowerMessage.includes('hobby') || lowerMessage.includes('hobbies') || lowerMessage.includes('interest') ||
        lowerMessage.includes('like to do') || lowerMessage.includes('free time') || lowerMessage.includes('passion')) {
        return "Marc is passionate about web development and building AI-powered applications! He loves learning new technologies and creating projects that solve real problems. Check out his projects to see what he's been working on!";
    }

    // Pricing/Rates
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') ||
        lowerMessage.includes('charge') || lowerMessage.includes('fee') || lowerMessage.includes('budget')) {
        return "For project pricing and rates, please contact Marc directly at marcveslino000@gmail.com. He'll be happy to discuss your project requirements and provide a customized quote!";
    }

    // Unknown questions - check if asking about something not in portfolio
    if (lowerMessage.startsWith('what is') || lowerMessage.startsWith('what\'s')) {
        // Extract what they're asking about
        const term = lowerMessage
            .replace(/^what is |^what's /i, '')
            .replace(/\?/g, '')
            .trim();

        // Check if it's something we know about
        const knownTerms = ['mindstack', 'spendsense', 'blinders', 'vault', 'eventure', 'youthconnect', 'smilesync',
            'react', 'next', 'angular', 'spring', 'node', 'typescript', 'javascript', 'java', 'python', 'mysql',
            'marc', 'project', 'skill', 'experience', 'his experience', 'background',
            'otp', '50/30/20', 'ai-powered', 'ai powered', 'c++', 'tailwind', 'sql server'];

        const isKnownTerm = knownTerms.some(known => term.toLowerCase().includes(known) || known.includes(term.toLowerCase()));

        if (!isKnownTerm && term.length > 2) {
            return `I don't have information about "${term}" in Marc's portfolio. I can tell you about his projects (MindStack, SpendSense, Blinders Vault, Eventure, YouthConnect, SmileSync), skills, or experience. What would you like to know?`;
        }
    }

    // Generic fallback// Generic fallback
    return "I'm Marc's AI assistant! I can help you learn about his projects, skills, and experience. Marc is a 3rd year IT student specializing in React, Next.js, and Angular. Feel free to ask me anything, or contact Marc directly at marcveslino000@gmail.com!";
}

export async function generateAIResponse(
    userMessage: string,
    conversationHistory: { role: string; content: string }[] = [],
    userProfile?: { name?: string; email?: string; previousTopics?: string[] }
): Promise<string> {
    try {
        console.log('🤖 Generating AI response for:', userMessage);
        console.log('📚 Conversation history length:', conversationHistory.length);

        // Check if it's an availability question - use fallback directly
        const lowerMsg = userMessage.toLowerCase();
        if ((lowerMsg.includes('available') && lowerMsg.includes('work')) ||
            (lowerMsg.includes('hire') || lowerMsg.includes('hiring')) ||
            (lowerMsg.includes('freelance')) ||
            (lowerMsg.includes('work with') && (lowerMsg.includes('you') || lowerMsg.includes('marc'))) ||
            (lowerMsg.includes('wanna work') || lowerMsg.includes('want to work')) ||
            (lowerMsg.includes('collaborate') && (lowerMsg.includes('you') || lowerMsg.includes('marc')))) {
            console.log('✅ Using direct fallback for availability question');
            return "Marc is currently a 3rd year IT student at PUP-Taguig and is open to:\n\n• Internship opportunities\n• Freelance projects\n• Collaborations\n\nFeel free to reach out at marcveslino000@gmail.com!";
        }

        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 500,
            }
        });

        let conversationContext = '';
        if (conversationHistory.length > 0) {
            conversationContext = '\n\nPrevious conversation:\n' +
                conversationHistory.slice(-6).map(msg =>
                    `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
                ).join('\n');
        }

        const context = `You are a helpful AI assistant for Marc Vesliño's portfolio website.

About Marc:
- 3rd year IT student at PUP-Taguig
- Frontend Web Developer
- Skills: React, Next.js, Angular, Spring Boot, Node.js, TypeScript, JavaScript, Java, Python, C++, Tailwind CSS, MySQL, SQL Server
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
${userProfile?.name ? `\n\nYou are talking to: ${userProfile.name}` : ''}${conversationContext}

Current question: ${userMessage}

CRITICAL INSTRUCTIONS:
1. READ THE QUESTION CAREFULLY BEFORE ANSWERING!
2. If user asks "what projects" or "his projects" or "your projects" → ALWAYS list ALL SIX projects (MindStack, SpendSense, Blinders Vault, Eventure, YouthConnect, SmileSync)
3. If user asks "what skills" or "his skills" or "your skills" → ALWAYS list ALL skills organized by category
4. If user asks "are you available" or "available for work" or "hiring" or "freelance" → ANSWER ABOUT AVAILABILITY, NOT PROJECTS! Say: "Marc is currently a 3rd year IT student at PUP-Taguig and is open to internship opportunities, freelance projects, and collaborations. Feel free to reach out at marcveslino000@gmail.com!"
5. If user asks about "the first/second/third/fourth/fifth/sixth one" → Look at previous message and identify which project:
   - 1st = MindStack
   - 2nd = SpendSense
   - 3rd = Blinders Vault
   - 4th = Eventure
   - 5th = YouthConnect
   - 6th = SmileSync
6. If user asks "what is [term]" and that term was just mentioned in previous conversation → Explain that specific term:
   - "What is 50/30/20 rule?" → Explain the budgeting rule (50% needs, 30% wants, 20% savings)
   - "What is OTP?" → Explain One-Time Password verification
   - "What is AI-powered?" → Explain how MindStack's AI works
7. If user asks about something NOT in Marc's portfolio → Say "I don't have information about [term]. I can tell you about Marc's projects, skills, or experience."
8. Keep responses concise (2-4 sentences) unless listing projects/skills
9. NEVER say "I'm Marc's AI assistant" unless user asks "who are you"
10. Reference previous context naturally

IMPORTANT: "Are you available for work?" is asking about AVAILABILITY, not PROJECTS!

Examples:
Q: "What projects have you worked on?"
A: "Marc has worked on several impressive projects including:

• MindStack - An AI-powered learning platform with Angular and Spring Boot
• SpendSense - A smart budgeting mobile app using the 50/30/20 rule
• Blinders Vault - A secure banking system with OTP verification
• Eventure - Complete event management system with real-time tracking
• YouthConnect - SK governance platform for youth engagement
• SmileSync - Dental appointment management system

Would you like to know more about any specific project?"

Q: "What are your skills?"
A: "Marc specializes in:

• Frontend: React, Next.js, Angular, Tailwind CSS
• Backend: Spring Boot, Node.js
• Languages: TypeScript, JavaScript, Java, Python, C++
• Databases: MySQL, SQL Server

He's experienced in full-stack development!"

Q: "Are you available for work?"
A: "Marc is currently a 3rd year IT student at PUP-Taguig and is open to:

• Internship opportunities
• Freelance projects
• Collaborations

Feel free to reach out at marcveslino000@gmail.com!"

Your response:`;

        const result = await model.generateContent(context);
        const response = result.response;
        const text = response.text();

        console.log('✅ AI response generated successfully');
        console.log('📝 Response preview:', text.substring(0, 100) + '...');

        return text;
    } catch (error) {
        console.error('❌ AI Error:', error);
        console.error('Error details:', JSON.stringify(error, null, 2));
        console.log('⚠️ Using fallback response with context awareness');
        return getFallbackResponse(userMessage, conversationHistory);
    }
}
