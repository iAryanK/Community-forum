"use client";

import { useSession } from "next-auth/react";
import { savePost } from "@/lib/posts.action";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downvoteComment, upvoteComment } from "@/lib/comments.action";

const LikePostComment = ({
  upvotes,
  postId,
  commentId,
  hasUpvoted,
}: {
  upvotes: number;
  postId: string;
  commentId: string;
  hasUpvoted: boolean | undefined;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleLikePost = async () => {
    if (!session?.user?.id) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to react on a comment.",
      });
    } else {
      await upvoteComment(session.user.id, commentId, postId);
    }
  };
  return (
    <button className="flex gap-2 items-center" onClick={handleLikePost}>
      <ThumbsUp
        size={20}
        fill={hasUpvoted ? "#f59e0b" : "none"}
        className={`cursor-pointer hover:scale-105 duration-200 ease-in-out ${
          hasUpvoted && "text-amber-500"
        }`}
      />
      {upvotes}
    </button>
  );
};

const DislikePostComment = ({
  downvotes,
  postId,
  commentId,
  hasDownvoted,
}: {
  downvotes: number;
  postId: string;
  commentId: string;
  hasDownvoted: boolean | undefined;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleDislikePost = async () => {
    if (!session?.user?.id) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to react on a comment.",
      });
    } else {
      await downvoteComment(session.user.id, commentId, postId);
    }
  };

  return (
    <button className="flex gap-2 items-center" onClick={handleDislikePost}>
      <ThumbsDown
        size={20}
        fill={hasDownvoted ? "#f59e0b" : "none"}
        className={`cursor-pointer hover:scale-105 duration-200 ease-in-out ${
          hasDownvoted && "text-amber-500"
        }`}
      />
      {downvotes}
    </button>
  );
};

const ToggleSavePost = ({
  postId,
  authorId,
  hasSaved,
}: {
  postId: string;
  authorId: string;
  hasSaved?: boolean;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSavePost = async () => {
    if (!session) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to bookmark the post.",
      });
    }

    await savePost(postId, authorId);
  };

  return (
    <Star
      onClick={handleSavePost}
      fill={hasSaved ? "#f59e0b" : "none"}
      className={`cursor-pointer ${hasSaved && "text-amber-500"}`}
    />
  );
};

export { LikePostComment, DislikePostComment, ToggleSavePost };
