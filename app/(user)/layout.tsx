import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import TrendingPosts from "@/components/TrendingPosts";
import Bg from "@/components/Bg";
import CreatePost from "@/components/CreatePost";

export const metadata: Metadata = {
  title: "Exadata Community",
  description:
    "Access a community of big data enthusiasts actively working in healthcare sector and engage in meaningful conversations with your peers.",
};

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="w-screen">
        <Bg />
      </div>

      <div>
        <Navbar />

        <main className="max-w-[90rem] h-full mx-auto pt-28">
          <div className="flex h-full w-full">
            {children}
            <div className="max-md:hidden">
              <UserProfile />
              <CreatePost />
              <TrendingPosts />
            </div>
          </div>
          <div className="md:hidden">
            <TrendingPosts />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}
