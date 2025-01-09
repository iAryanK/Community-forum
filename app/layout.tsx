import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import TrendingPosts from "@/components/TrendingPosts";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Image from "next/image";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
          <Navbar />

          <div className="grow">
            <Image
              src="./bg.svg"
              alt="background"
              width={10000}
              height={10000}
              className="bg-cover fill-black w-full inset-0 z-[-2] absolute gradient-fade dark:hidden"
            />
            <Image
              src="./bg-dark.svg"
              alt="background"
              width={10000}
              height={10000}
              className="bg-cover invert opacity-30 w-full inset-0 z-[-2] absolute gradient-fade hidden dark:flex"
            />

            <main className="max-w-5xl h-full mx-auto pt-20">
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
        </ThemeProvider>
      </body>
    </html>
  );
}
