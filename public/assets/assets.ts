export const assets = {
    user_image: '/assets/user-image.png',
    code_icon: '/assets/code-icon.png',
    code_icon_dark: '/assets/code-icon-dark.png',
    edu_icon: '/assets/edu-icon.png',
    edu_icon_dark: '/assets/edu-icon-dark.png',
    project_icon: '/assets/project-icon.png',
    project_icon_dark: '/assets/project-icon-dark.png',
    vscode: '/assets/vscode.png',
    firebase: '/assets/firebase.png',
    figma: '/assets/figma.png',
    git: '/assets/git.png',
    mongodb: '/assets/mongodb.png',
    right_arrow_white: '/assets/right-arrow-white.png',
    logo: '/assets/logo.png',
    logo_dark: '/assets/logo_dark.png',
    mail_icon: '/assets/mail_icon.png',
    mail_icon_dark: '/assets/mail_icon_dark.png',
    profile_img: '/assets/profile-img.png',
    profile_image: '/assets/profile-image.jpg',
    download_icon: '/assets/download-icon.png',
    hand_icon: '/assets/hand-icon.png',
    header_bg_color: '/assets/header-bg-color.png',
    moon_icon: '/assets/moon_icon.png',
    sun_icon: '/assets/sun_icon.png',
    arrow_icon: '/assets/arrow-icon.png',
    arrow_icon_dark: '/assets/arrow-icon-dark.png',
    menu_black: '/assets/menu-black.png',
    menu_white: '/assets/menu-white.png',
    close_black: '/assets/close-black.png',
    close_white: '/assets/close-white.png',
    web_icon: '/assets/web-icon.png',
    mobile_icon: '/assets/mobile-icon.png',
    ui_icon: '/assets/ui-icon.png',
    graphics_icon: '/assets/graphics-icon.png',
    right_arrow: '/assets/right-arrow.png',
    send_icon: '/assets/send-icon.png',
    right_arrow_bold: '/assets/right-arrow-bold.png',
    right_arrow_bold_dark: '/assets/right-arrow-bold-dark.png',
    linkedin_logo_black: '/assets/linkedin-logo-black.png',
    linkedin_logo_white: '/assets/linkedin-logo-white.png',
    github_invertocat_black: '/assets/github-invertocat-black.png',
    github_invertocat_white: '/assets/github-invertocat-white.png'
};

export const workData = [
    {
        title: 'Frontend project',
        description: 'Web Design',
        bgImage: '/work-1.png',
    },
    {
        title: 'Geo based app',
        description: 'Mobile App',
        bgImage: '/work-2.png',
    },
    {
        title: 'Photography site',
        description: 'Web Design',
        bgImage: '/work-3.png',
    },
    {
        title: 'UI/UX designing',
        description: 'UI/UX Design',
        bgImage: '/work-4.png',
    },
];

export const serviceData = [
    { icon: assets.web_icon, title: 'Web design', description: 'Web development is the process of building, programming...', link: '' },
    { icon: assets.mobile_icon, title: 'Mobile app', description: 'Mobile app development involves creating software for mobile devices...', link: '' },
    { icon: assets.ui_icon, title: 'UI/UX design', description: 'UI/UX design focuses on creating a seamless user experience...', link: '' },
    { icon: assets.graphics_icon, title: 'Graphics design', description: 'Creative design solutions to enhance visual communication...', link: '' },
];

export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Languages', description: 'HTML, CSS, JavaScript React Js, Next Js' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'B.Tech in Computer Science' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 5 projects' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];

export const projectsData = [
    {
        id: 1,
        title: "MindStack",
        description: "AI-powered learning platform with community features",
        type: "Web App",
        thumbnail: "/assets/projects/mindstack-landing.png",
        images: [
            "/assets/projects/mindstack-landing.png",
            "/assets/projects/mindstack-dashboard.png",
            "/assets/projects/mindstack-features.png",
            "/assets/projects/mindstack-view-quiz-sample.png"
        ],
        about: "MindStack is a web-based learning platform designed to make studying more effective and engaging. It allows students to create custom flashcards and quizzes, track their progress over time, and collaborate with classmates through community learning features.",
        features: [
            "Create custom flashcards & quizzes with full control",
            "Track quiz scores and improvement over time",
            "Share study sets and collaborate with community",
            "Public & private study sets for flexible learning",
            "Get question suggestions from peers",
            "Real-time notifications for community interactions"
        ],
        technologies: ["Angular", "Spring Boot", "MySQL", "TypeScript", "Java"],
        githubLink: "",
        liveLink: ""
    },
    {
        id: 2,
        title: "Blinders Vault",
        description: "Secure banking system with OTP verification",
        type: "Web App",
        thumbnail: "/assets/projects/blinders-vault-landing.png",
        images: [
            "/assets/projects/blinders-vault-landing.png",
            "/assets/projects/blinders-vault-register.png",
            "/assets/projects/blinders-vault-bank-teller-dashboard.png",
            "/assets/projects/blinders-vault-account-holder-dashboard.png"
        ],
        about: "A secure and user-friendly web application designed to serve both bank tellers and account holders. The platform allows users to easily perform banking transactions like deposits, withdrawals, and transfers while maintaining strong security measures.",
        features: [
            "Dual interface for tellers and account holders",
            "Secure deposits and withdrawals",
            "Internal and external fund transfers",
            "Transaction history tracking",
            "OTP verification for enhanced security",
            "Real-time balance updates"
        ],
        technologies: ["HTML5", "CSS", "JavaScript", "PHP", "MySQL"],
        githubLink: "",
        liveLink: ""
    },
    {
        id: 3,
        title: "Eventure",
        description: "Complete event management with real-time tracking",
        type: "Web App",
        thumbnail: "/assets/projects/eventure-landing.png",
        images: [
            "/assets/projects/eventure-landing.png",
            "/assets/projects/eventure-login.png",
            "/assets/projects/eventure-organizer-dashboard.png",
            "/assets/projects/eventure-attendee-dashboard.png"
        ],
        about: "Eventure is a modern event management system designed to streamline all aspects of the event lifecycle—from registration and planning to monitoring and notifications. With its dynamic interface and robust database architecture, Eventure ensures effectiveness and secure preservation of participant data.",
        features: [
            "Role-based access for organizers and attendees",
            "Create and manage multiple event sessions",
            "Real-time attendance tracking with check-in/out",
            "Event notifications and reminders",
            "Post-event feedback and ratings system",
            "File and material management for sessions"
        ],
        technologies: ["Java", "SQL Server"],
        githubLink: "",
        liveLink: ""
    },
    {
        id: 4,
        title: "SpendSense",
        description: "Smart budgeting app using the 50/30/20 rule",
        type: "Mobile App",
        thumbnail: "/assets/projects/spendsense-landing-mobile-app.jpg",
        images: [
            "/assets/projects/spendsense-splash-mobile-app.jpg",
            "/assets/projects/spendsense-landing-mobile-app.jpg",
            "/assets/projects/spendsense-dashboard-mobile-app.jpg",
            "/assets/projects/spendsense-setup1-budget-mobile-app.jpg"
        ],
        about: "SpendSense is a personal finance management app that helps you track expenses, manage budgets using the 50/30/20 rule, and monitor your spending habits. The app provides insightful analytics and helps users make informed financial decisions.",
        features: [
            "Budget management with 50/30/20 rule",
            "Track expenses and income by category",
            "Visual analytics and spending breakdown",
            "Transaction history with search and filter",
            "Category-based spending insights",
            "Secure PIN and password protection"
        ],
        technologies: ["Kotlin", "Android", "SharedPreferences"],
        githubLink: "",
        liveLink: ""
    }
];
