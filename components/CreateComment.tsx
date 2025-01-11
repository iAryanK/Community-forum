"use client";

import { createComment } from "@/lib/comments.action";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";

const CreateComment = ({
  authorId,
  postId,
}: {
  authorId: string;
  postId: string;
}) => {
  const [content, setContent] = useState("");
  const { toast } = useToast();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session) {
      return toast({
        title: "You are not logged in !",
        description: "Please login to create a comment.",
      });
    }

    if (!content) return;

    const res = await createComment(authorId, postId, content);

    if (!res) {
      return toast({
        title: "Failed to create comment",
      });
    } else {
      setContent("");
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <textarea
          name="comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment"
          className="w-full p-2 border border-secondary rounded-lg"
        />
        <Button
          type="submit"
          variant={"secondary"}
          className="mt-2 w-full font-geist_mono text-base"
        >
          Comment
        </Button>
      </form>
    </>
  );
};

export default CreateComment;
