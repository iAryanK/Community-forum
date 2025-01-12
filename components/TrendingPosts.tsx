import { fetchTrendingPosts } from "@/lib/posts.action";
import { FileText } from "lucide-react";
import Link from "next/link";

const TrendingPosts = async () => {
  const posts = await fetchTrendingPosts();

  return (
    <div className="m-4 p-4 md:w-80 backdrop-blur-sm bg-secondary/30 rounded-lg space-y-2 text-sm md:motion-preset-slide-left max-md:motion-preset-slide-up">
      <div className="text-lg tracking-wide font-geist_mono mb-2 flex gap-4 items-center motion-preset-typewriter-[20] motion-duration-[4s] w-fit motion-loop-[1.5]">
        Trending Posts...
      </div>
      <hr className="w-3/4 pb-4" />
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Link
            href={`/posts/${post._id}`}
            className="flex gap-4  hover:text-blue-400 items-center max-sm:pb-2"
            key={post._id}
          >
            <p>
              <FileText />
            </p>
            <p className="line-clamp-3">{post.title}</p>
          </Link>
        ))}
    </div>
  );
};

export default TrendingPosts;
