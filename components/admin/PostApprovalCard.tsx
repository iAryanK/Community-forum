/* eslint-disable @typescript-eslint/no-explicit-any */

import Image from "next/image";
import { formatDate } from "@/lib/utils";
import ApprovalButton from "./ApprovalButton";
import Link from "next/link";

const PostApprovalCard = ({
  post,
  showImage,
  approved,
}: {
  post: any;
  showImage?: boolean;
  approved?: boolean;
}) => {
  return (
    <div className="hover:bg-secondary/80 rounded-lg p-3 flex gap-2 items-start bg-secondary/50 mt-1 motion-preset-slide-up">
      {showImage && post?.author?.image && (
        <Link
          href={`/users/${post.author._id}`}
          className="rounded-full h-12 w-12"
        >
          <Image
            src={post.author.image}
            alt={post.title}
            width={100}
            height={100}
            className="rounded-full"
          />
        </Link>
      )}
      <div className="w-full space-y-1">
        <Link href={`/users/${post.author._id}`} className="text-amber-500">
          {post.author.name}
        </Link>
        <Link href={`/posts/${post._id}`} className="space-y-1">
          <h5 className="text-lg">{post.title}</h5>
          <p className="text-muted-foreground text-sm line-clamp-2">
            {post.content}
          </p>
        </Link>

        <div className="flex justify-between items-center pt-4 text-sm">
          <p className="bg-amber-500/50 py-[2px] px-2 rounded-xl text-[11px] text-black dark:text-white font-geist_mono">
            {formatDate(post.createdAt)}
          </p>
          {!approved && <ApprovalButton postId={JSON.stringify(post._id)} />}
        </div>
      </div>
    </div>
  );
};

export default PostApprovalCard;
