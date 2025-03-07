import { Footer } from "@/components/footer";
import { FooterCTA } from "@/components/footer-cta";
import { Header } from "@/components/header";
import "@/styles/globals.css";
import { cn } from "@midday/ui/cn";
import "@midday/ui/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Provider as Analytics } from "@midday/events/client";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { baseUrl } from "./sitemap";
import { AuthProvider } from '@/contexts/AuthContext';
import { FinanceDataProvider } from '@/providers/FinanceDataProvider';

export const preferredRegion = ["fra1", "sfo1", "iad1"];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Vestern",
    template: "%s | Vestern",
  },
  description:
    "Vestern provides you with greater insight into your business and automates the boring tasks, allowing you to focus on what you love to do instead.",
  openGraph: {
    title: "Vestern | The All in one Finance app",
    description:
      "AI-driven insights meet human expertise, creating a new era of intelligent investing",
    url: baseUrl,
    siteName:
      "AI-driven insights meet human expertise, creating a new era of intelligent investing",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Vestern | The All in one Finance app",
    description:
      "AI-driven insights meet human expertise, creating a new era of intelligent investing",
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfbfb" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          "bg-[#fbfbfb] dark:bg-[#000000] min-h-screen antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <FinanceDataProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow container mx-auto px-4">
                  {children}
                </main>
                <FooterCTA />
                <Footer />
                <Analytics />
              </div>
            </FinanceDataProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}