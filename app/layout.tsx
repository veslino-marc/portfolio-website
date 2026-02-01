import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marc | Portfolio",
  description: "Frontend web developer specializing in Angular, React, Next.js, and Spring Boot. 3rd year IT student at PUP-Taguig building modern web and mobile applications.",
  keywords: [
    "Marc Vesliño",
    "Frontend Web Developer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Angular Developer",
    "Web Developer Philippines",
    "PUP Taguig",
    "Portfolio",
  ],
  authors: [{ name: "Marc Vesliño" }],
  creator: "Marc Vesliño",
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/favicon-16x16.png?v=2", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=2" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marcveslino000.com",
    title: "Marc Vesliño | Portfolio",
    description: "Frontend web developer specializing in React, Next.js, Angular, and Spring Boot. Building modern web and mobile applications.",
    siteName: "Marc Vesliño Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Vesliño | Frontend Web Developer Portfolio",
    description: "Frontend web developer specializing in  Angular, React, Next.js and Spring Boot.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png?v=3" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png?v=3" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
