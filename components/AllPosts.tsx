import { fetchAllPosts } from "@/lib/posts.action";
import PostCard from "./PostCard";

const AllPosts = async () => {
  const posts = await fetchAllPosts();

  return (
    <div className="">
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} />)}
    </div>
  );
};

export default AllPosts;
