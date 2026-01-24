import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DarkModeProvider } from "./context/DarkModeContext";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Marc Vesliño | Full-Stack Developer Portfolio",
  description: "Full-stack developer specializing in React, Next.js, Angular, and Spring Boot. 3rd year IT student at PUP-Taguig building modern web and mobile applications.",
  keywords: [
    "Marc Vesliño",
    "Full-Stack Developer",
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
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marcveslino.com",
    title: "Marc Vesliño | Full-Stack Developer Portfolio",
    description: "Full-stack developer specializing in React, Next.js, Angular, and Spring Boot. Building modern web and mobile applications.",
    siteName: "Marc Vesliño Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marc Vesliño | Full-Stack Developer Portfolio",
    description: "Full-stack developer specializing in React, Next.js, Angular, and Spring Boot.",
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
      <body className={`${inter.variable} antialiased`}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
