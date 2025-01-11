/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchPostById } from "@/lib/posts.action";
import { fetchUserById } from "@/lib/users.action";
import {
  DislikePostComment,
  LikePostComment,
  ToggleSavePost,
} from "@/components/PostFeatures";
import { formatDate, formatNumber, getTimestamp } from "@/lib/utils";
import { Clock, Eye, MessageSquareText } from "lucide-react";
import Image from "next/image";
import CreateComment from "@/components/CreateComment";
import { getCommentById } from "@/lib/comments.action";
import { auth } from "@/auth";
import Link from "next/link";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await fetchPostById(id);
  const session = await auth();
  const user = await fetchUserById(session?.user?.id);

  return (
    <div className="m-4 p-4 w-full backdrop-blur-sm bg-secondary/30 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <Link
          href={`/users/${post.author._id}`}
          className="flex gap-4 items-center"
        >
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <p>{post.author.name}</p>
        </Link>
        <div>
          <ToggleSavePost
            postId={JSON.stringify(post._id)}
            userId={user && JSON.stringify(user._id)}
            hasSaved={user && user.saved.includes(post._id)}
          />
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

      <div className="flex gap-5 mb-4 text-zinc-400 font-geist_mono">
        <p className="flex gap-2 items-center">
          <Clock size={16} /> {formatDate(post.createdAt)}
        </p>
        <p className="flex gap-2 items-center">
          <Eye size={16} /> {formatNumber(post.views)}
        </p>
        <p className="flex gap-2 items-center">
          <MessageSquareText size={16} /> {formatNumber(post.comments.length)}
        </p>
      </div>
      <h3 className="font-light">{post.content}</h3>

      <div className="py-5 text-amber-500 text-lg">
        {formatNumber(post.comments.length)}{" "}
        {post.comments.length > 1 ? "Comments" : "Comment"}
      </div>

      <CreateComment
        authorId={JSON.stringify(post.author._id)}
        postId={JSON.stringify(post._id)}
      />

      <div className="mt-8 space-y-5">
        <div className="text-lg text-amber-500">All Comments</div>
        {post.comments.map((comment: any) => (
          <CommentCard
            key={comment._id}
            commentId={comment}
            postId={JSON.stringify(post._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;

const CommentCard = async ({
  commentId,
  postId,
}: {
  commentId: any;
  postId: string;
}) => {
  const comment = await getCommentById(commentId);
  const session = await auth();

  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={comment.author.image}
            alt={comment.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p>{comment.author.name}</p>
        </div>
        <div className="flex gap-4">
          <LikePostComment
            upvotes={comment.upvotes.length}
            postId={postId}
            commentId={JSON.stringify(comment._id)}
            hasUpvoted={comment.upvotes.includes(session?.user?.id)}
          />
          <DislikePostComment
            downvotes={comment.downvotes.length}
            postId={postId}
            commentId={JSON.stringify(comment._id)}
            hasDownvoted={comment.downvotes.includes(session?.user?.id)}
          />
        </div>
      </div>
      <p className="pt-4 pb-2 font-light">{comment.content}</p>

      <p className="text-zinc-400 font-geist_mono">
        - created {getTimestamp(comment.createdAt)}
      </p>
    </div>
  );
};
