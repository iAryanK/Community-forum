import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import TrendingPosts from "@/components/TrendingPosts";
import { ThemeProvider } from "@/components/providers/theme-provider";
// import Image from "next/image";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import Bg from "@/components/Bg";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
        className={`${geistMono.variable} ${poppins.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <div className="w-screen">
              <Bg />
            </div>
            <NextTopLoader showSpinner={false} />

            <div>
              <Navbar />

              <main className="max-w-[90rem] h-full mx-auto pt-28">
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
            </div>
            <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
