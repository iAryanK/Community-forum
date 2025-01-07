import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import TrendingPosts from "@/components/TrendingPosts";
import { ThemeProvider } from "@/components/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Exadata Community",
  description:
    "Access a community of big data enthusiasts actively working in healthcare sector and engage in meaningful conversations with your peers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-5xl h-full mx-auto">
            <Navbar />
            <div className="flex h-full w-full">
              {children}
              <div className="max-md:hidden">
                <UserProfile />
                <TrendingPosts />
              </div>
            </div>
            <div className="md:hidden">
              <TrendingPosts />
            </div>
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
