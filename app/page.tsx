import AllPosts from "@/components/AllPosts";
import CreatePost from "@/components/CreatePost";
import Welcome from "@/components/Welcome";

export default function Home() {
  return (
    <div className="m-5 w-full">
      <Welcome />
      <CreatePost />
      <AllPosts />
    </div>
  );
}
