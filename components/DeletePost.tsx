"use client";

import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/posts.action";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteComment } from "@/lib/comments.action";
import { useState } from "react";

const DeletePost = ({
  contentId,
  isComment,
}: {
  contentId: string;
  isComment?: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeletePost = async () => {
    setIsLoading(true);
    const res = await deletePost(contentId);
    setIsLoading(false);
    if (res) router.replace("/");
    else {
      return toast({
        title: "Error !",
        description: "Failed to delete the post",
      });
    }
  };

  const handleDeleteComment = async () => {
    setIsLoading(true);
    const res = await deleteComment(contentId);
    setIsLoading(false);
    if (res) router.refresh();
    else {
      return toast({
        title: "Error !",
        description: "Failed to delete the comment",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="p-2 rounded-full hover:bg-secondary ease-in-out transition-all hover:scale-105">
          <Trash2
            size={18}
            className={`${isLoading && "motion-preset-seesaw-lg"}`}
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It is an &apos;admin only&apos; action
            that will permanently delete the content.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              if (isComment) handleDeleteComment();
              else handleDeletePost();
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePost;
