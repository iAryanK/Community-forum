"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useInputStore } from "@/hooks/usePostStore";
import { createPost } from "@/lib/posts.action";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";

const CreatePostDialog = ({ authorId }: { authorId: string }) => {
  const { toast } = useToast();
  const { inputData, setInputData } = useInputStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputData.title || !inputData.content) return;

    setIsLoading(true);

    await createPost({ ...inputData, authorId });

    setInputData({ title: "", content: "", invite: [] });
    setIsLoading(false);
    toast({
      title: "Success !",
      description: "Your post will be listed here upon approval.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <div
          className="flex h-10 items-center border-none border-zinc-950/20 p-2  dark:border-zinc-50/20 dark:bg-zinc-800 dark:text-zinc-50 dark:bg-gradient-to-r dark:from-[#C30F66] dark:to-[#C30F55] bg-[#C30F55] hover:bg-[#C30F55]/90 w-full justify-center text-white"
          style={{
            borderRadius: 8,
          }}
        >
          <span>Create Post</span>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogTitle className="sr-only">Post</DialogTitle>
        <div
          className="relative h-[600px] left-0 mx-auto w-full shrink overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-800"
          style={{
            borderRadius: 12,
          }}
        >
          <form
            className="flex h-full flex-col"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              className="h-12 w-full px-4 py-3 text-sm outline-none dark:bg-zinc-900 bg-zinc-200"
              autoFocus
              value={inputData.title}
              onChange={(e) =>
                setInputData({ ...inputData, title: e.target.value })
              }
            />
            <MDEditor
              value={inputData.content}
              onChange={(value) =>
                setInputData({ ...inputData, content: value as string })
              }
              preview="edit"
              height={500}
              style={{ borderRadius: 0, overflow: "hidden" }}
              textareaProps={{
                placeholder: "Description",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />{" "}
            <input
              type="email"
              name="invite"
              placeholder="Invite (comma separated emails)"
              className="h-12 w-full px-4 py-3 text-sm outline-none dark:bg-zinc-900 bg-zinc-200"
              autoFocus
              value={inputData.invite}
              onChange={(e) =>
                setInputData({ ...inputData, invite: [e.target.value] })
              }
            />
            <div className="flex justify-end px-4 py-3">
              <button
                className="relative ml-1 flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800"
                type="submit"
                aria-label="Submit note"
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <div className="flex gap-1">
                    <LoaderCircle className="animate-spin" size={18} />{" "}
                    Submitting
                  </div>
                ) : (
                  <>Submit Post</>
                )}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
