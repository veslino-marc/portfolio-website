# Marc Vesliño - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and experience as a Frontend Web Developer, featuring an AI-powered chatbot with smart escalation.

🔗 **Live Site:** [https://portfolio-website-marcveslino.vercel.app/](https://portfolio-website-marcveslino.vercel.app/)

## ✨ Features

### Core Features
- **Responsive Design** - Fully responsive across all devices
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Interactive Project Showcase** - Modal-based project gallery with image carousels
- **Animated Particles Background** - Dynamic geometric particles in header section
- **Scroll Animations** - Smooth fade-in animations as you scroll through sections
- **Contact Form** - Integrated with Web3Forms for email submissions
- **SEO Optimized** - Comprehensive metadata and Open Graph tags
- **Performance Optimized** - Fast loading with Next.js Image optimization

### 🤖 AI Chatbot (NEW!)
- **Context-Aware AI** - Remembers conversation history and provides relevant responses
- **Smart Escalation** - Automatically notifies via Telegram for hiring/business inquiries
- **Quick Replies** - Pre-defined questions for easy interaction
- **Session-Based Storage** - Conversations persist during session, fresh start on new visit
- **Beautiful UI** - Modern chat interface with animations and copy functionality
- **Telegram Integration** - Real-time notifications with interactive buttons
- **6 Projects Coverage** - Comprehensive information about all portfolio projects

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Deployment:** Vercel

### Chatbot & Backend
- **AI:** Google Gemini 2.0 Flash
- **Database:** Supabase (PostgreSQL)
- **Notifications:** Telegram Bot API
- **Form Handling:** Web3Forms API

### Tools
- **Version Control:** Git/GitHub
- **Package Manager:** npm

## 📄 Sections

1. **Header** - Introduction with animated particles background
2. **About Me** - Timeline of my journey and background
3. **Projects** - Showcase of 6 major projects with detailed modals
4. **Skills** - Technologies and tools I work with
5. **Contact** - Contact form and social links
6. **AI Chatbot** - Interactive assistant (bottom-right corner)

## 🎯 Projects Featured

- **MindStack** - AI-powered learning platform (Angular, Spring Boot, MySQL)
- **SpendSense** - Smart budgeting mobile app (Android, Kotlin)
- **Blinders Vault** - Secure banking system (HTML, CSS, JavaScript, PHP)
- **Eventure** - Event management system (Java, SQL Server)
- **YouthConnect** - SK governance platform (Angular, Spring Boot, MySQL)
- **SmileSync** - Dental appointment system (C++)

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── api/
│   │   ├── chat/              # Chat API endpoint
│   │   └── telegram/          # Telegram webhook handler
│   ├── components/
│   │   ├── ChatWidget.tsx     # Chat button
│   │   ├── ChatWindow.tsx     # Chat interface
│   │   ├── Header.tsx         # Hero section
│   │   ├── Projects.tsx       # Project showcase
│   │   ├── Skills.tsx         # Skills section
│   │   └── Contact.tsx        # Contact form
│   ├── lib/
│   │   ├── gemini.ts          # AI logic
│   │   ├── escalation.ts      # Smart escalation
│   │   ├── telegram.ts        # Telegram notifications
│   │   └── supabase.ts        # Database client
│   ├── hooks/                 # Custom React hooks
│   ├── privacy/               # Privacy policy page
│   ├── terms/                 # Terms of service page
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── public/
│   └── assets/                # Images and icons
├── database/
│   ├── supabase-schema.sql    # Database schema
│   └── migrate-database.sql   # Migration script
├── documentation/             # Project documentation
└── scripts/                   # Utility scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for chatbot)
- Google AI Studio API key (for chatbot)
- Telegram Bot Token (for notifications)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/veslino-marc/portfolio-website.git
cd portfolio-website
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**

Create a `.env.local` file in the root directory:

```env
# Gemini AI
GEMINI_API_KEY=your_gemini_api_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id

# Web3Forms (Contact Form)
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your_web3forms_key
```

4. **Setup Database**

Run the SQL scripts in Supabase:
```bash
# Execute database/supabase-schema.sql in Supabase SQL Editor
# Execute database/migrate-database.sql for updates
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Building for Production

```bash
npm run build
npm start
```

## 🤖 Chatbot Features

### Smart Escalation
The chatbot automatically escalates to Telegram when:
- User explicitly requests human contact
- Frustration is detected
- Business/hiring inquiries are made
- Complex technical questions are asked
- Sensitive topics are mentioned
- Long conversations need human touch

### Telegram Integration
- Real-time notifications for important messages
- Interactive buttons (Take Over, Quick Reply, Mark Resolved)
- Conversation history viewing
- Pre-built response templates
- Webhook support for button interactions

### AI Capabilities
- Answers questions about projects, skills, and experience
- Remembers conversation context
- Provides relevant follow-up responses
- Handles 6 projects comprehensively
- Detects hiring/collaboration opportunities

## 📚 Documentation

Detailed documentation available in the `documentation/` folder:
- `QUICK_START.md` - Quick setup guide
- `CHAT_SYSTEM_GUIDE.md` - Chatbot usage guide
- `DEPLOYMENT_CHECKLIST.md` - Deployment steps
- `SYSTEM_FLOW.md` - System architecture
- `CHATBOT_UI_ENHANCEMENTS.md` - UI/UX improvements

## 🔧 Configuration

### Chatbot Customization
Edit `app/lib/gemini.ts` to customize:
- AI responses
- Fallback messages
- Context awareness rules

Edit `app/lib/escalation.ts` to customize:
- Escalation triggers
- Confidence thresholds
- Urgency levels

### UI Customization
Edit `app/components/ChatWindow.tsx` to customize:
- Chat interface design
- Quick reply buttons
- Color scheme

## 📞 Contact

- **Email:** marcveslino000@gmail.com
- **LinkedIn:** [linkedin.com/in/marcvesliño](https://www.linkedin.com/in/marcvesliño/)
- **GitHub:** [github.com/veslino-marc](https://github.com/veslino-marc)
- **Portfolio:** [https://portfolio-website-marcveslino.vercel.app/](https://portfolio-website-marcveslino.vercel.app/)

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ by Marc Vesliño | Powered by Next.js, Gemini AI, and Supabase
