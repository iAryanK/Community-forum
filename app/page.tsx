import AllPosts from "@/components/AllPosts";
import CreatePost from "@/components/CreatePost";

export default function Home() {
  return (
    <div className="m-5 w-full">
      <CreatePost />
      <AllPosts />
    </div>
  );
}
