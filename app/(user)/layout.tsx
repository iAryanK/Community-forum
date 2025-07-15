import Navbar from "@/components/Navbar";
import UserProfile from "@/components/UserProfile";
import Footer from "@/components/Footer";
import TrendingPosts from "@/components/TrendingPosts";
import Bg from "@/components/Bg";
import CreatePost from "@/components/CreatePost";

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
            <div className="max-md:hidden">
              <UserProfile />
              <CreatePost />
              <TrendingPosts />
            </div>
            {children}
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
