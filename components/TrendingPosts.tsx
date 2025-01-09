import { fetchTrendingPosts } from "@/lib/posts.action";
import { ChevronRight, FileText } from "lucide-react";
import Link from "next/link";

const TrendingPosts = async () => {
  const posts = await fetchTrendingPosts();

  return (
    <div className="m-4 p-4 md:w-60  backdrop-blur-sm bg-secondary/30 rounded-lg space-y-2 text-sm motion-preset-slide-left">
      <div className="text-lg tracking-wide font-geist_mono mb-5 flex gap-2 items-center">
        Trending Posts <ChevronRight />
      </div>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => (
          <Link
            href={`/posts/${post._id}`}
            className="flex gap-4  hover:text-blue-400 items-center"
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
