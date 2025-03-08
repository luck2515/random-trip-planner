import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ThemeToggle from "@/components/atoms/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Random Trip Planner - AIが旅行プランを提案",
  description: "AIを活用して、あなたの条件に合わせた旅行プランを提案します。予算や日数、目的地に応じて最適な旅程を生成します。",
  authors: [{ name: "Random Trip Planner Team" }],
  keywords: ["旅行", "プランニング", "AI", "観光", "旅程"],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-gray-200 dark:border-dark-border">
              <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Random Trip Planner</h1>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="border-t border-gray-200 dark:border-dark-border">
              <div className="container mx-auto px-4 py-4 text-center text-gray-600 dark:text-dark-text-secondary">
                © 2025 Random Trip Planner
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
