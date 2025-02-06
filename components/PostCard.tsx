import Image from "next/image";
import { formatDate, formatNumber } from "@/lib/utils";
import Link from "next/link";
import { Eye, MessageSquareText } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostCard = ({ post, showImage }: { post: any; showImage?: boolean }) => {
  return (
    <div className="hover:bg-secondary/50 hover:rounded-lg p-3 border-b border-secondary hover:border-none mt-1 motion-preset-slide-up">
      <div className="w-full space-y-1">
        <Link
          href={`/users/${post.author._id}`}
          className="flex gap-2 items-center mb-2"
        >
          {showImage && post?.author?.image && (
            <Image
              src={post.author.image}
              alt={post.title}
              width={48}
              height={48}
              className="rounded-full h-6 w-6"
            />
          )}
          <h4 className="text-[#C30F55] dark:text-[#ddd]">
            {post.author.name}
          </h4>
        </Link>
        <Link href={`/posts/${post._id}`} className="space-y-1">
          <h5 className="text-lg line-clamp-3">{post.title}</h5>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {post.content}
          </p>
        </Link>

        <div className="flex justify-between items-center pt-4 text-sm">
          <p className="bg-[#C30F55]/50 py-[2px] px-2 rounded-xl text-[11px] text-black dark:text-white font-geist_mono">
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
    </div>
  );
};

export default PostCard;
