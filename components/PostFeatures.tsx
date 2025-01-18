"use client";

import { useSession } from "next-auth/react";
import { savePost } from "@/lib/posts.action";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { downvoteComment, upvoteComment } from "@/lib/comments.action";
import { useState } from "react";

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
    if (!session) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to react on a comment.",
      });
    } else if (session.user?.id) {
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
  userId,
  hasSaved,
}: {
  postId: string;
  userId?: string;
  hasSaved?: boolean;
}) => {
  const { data: session } = useSession();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(hasSaved);

  const handleSavePost = async () => {
    if (!session || !userId) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to bookmark the post.",
      });
    }

    setIsSaved(!isSaved); // Optimistic update

    try {
      await savePost(postId, userId);
    } catch {
      setIsSaved(hasSaved);

      toast({
        title: "Error",
        description: "Failed to save the post. Please try again.",
      });
    }
  };

  return (
    <button className="hover:scale-105" onClick={handleSavePost}>
      <Star
        fill={isSaved ? "#f59e0b" : "none"}
        className={`cursor-pointer ${
          isSaved && "text-amber-500 motion-preset-shake"
        }`}
      />
    </button>
  );
};

export { LikePostComment, DislikePostComment, ToggleSavePost };
