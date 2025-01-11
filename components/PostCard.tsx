import Image from "next/image";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Eye, MessageSquareText } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostCard = ({ post, showImage }: { post: any; showImage?: boolean }) => {
  return (
    <Link
      href={`/posts/${post._id}`}
      className="hover:bg-secondary/50 hover:rounded-lg p-3 flex gap-2 items-start border-b border-secondary hover:border-none mt-1 motion-preset-slide-up"
    >
      {showImage && (
        <Image
          src={post.author.image}
          alt={post.title}
          width={100}
          height={100}
          className="rounded-full h-12 w-12"
        />
      )}
      <div className="w-full space-y-1">
        <h4 className="text-amber-500">{post.author.name}</h4>
        <h5 className="text-lg">{post.title}</h5>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {post.content}
        </p>

        <div className="flex justify-between items-center pt-4 text-sm">
          <p className="bg-amber-500/50 py-[2px] px-2 rounded-xl text-[11px] text-black dark:text-white font-geist_mono">
            {formatDate(post.createdAt)}
          </p>
          <div className="flex gap-5 items-center">
            <button className="flex gap-1 items-center">
              {formatNumber(post.views)}
              <span className="max-sm:hidden">Views</span>
              <span className="sm:hidden">
                <Eye size={18} />
              </span>
            </button>

            <button className="flex gap-1 items-center">
              {formatNumber(post.comments.length)}{" "}
              <span className="max-sm:hidden">Comments</span>
              <span className="sm:hidden">
                <MessageSquareText size={16} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
