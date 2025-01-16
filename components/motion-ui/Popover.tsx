"use client";

import useClickOutside from "@/hooks/useClickOutside";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { ArrowLeftIcon, LoaderCircle } from "lucide-react";
import { useRef, useState, useEffect, useId } from "react";
import { useInputStore } from "@/hooks/usePostStore";
import { createPost } from "@/lib/posts.action";

const TRANSITION = {
  type: "spring",
  bounce: 0.05,
  duration: 0.3,
};

export default function Popover({ authorId }: { authorId: string }) {
  const uniqueId = useId();
  const formContainerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { inputData, setInputData } = useInputStore();
  const [isLoading, setIsLoading] = useState(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // @ts-expect-error : Type Error in formContainerRef
  useClickOutside(formContainerRef, () => {
    closeMenu();
  });

  const handleSubmit = async () => {
    if (!inputData.title || !inputData.content) return;

    setIsLoading(true);

    await createPost({ ...inputData, authorId });

    closeMenu();
    setInputData({ title: "", content: "" });
    setIsLoading(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="flex flex-col items-center justify-center ">
        <motion.button
          key="button"
          layoutId={`popover-${uniqueId}`}
          className="flex h-10 items-center border-none border-zinc-950/20 p-2  dark:border-zinc-50/20 dark:bg-zinc-800 dark:text-zinc-50 dark:bg-gradient-to-r dark:from-amber-600 dark:to-amber-500 bg-[#272727] hover:bg-[#272727]/90 w-full justify-center text-white"
          style={{
            borderRadius: 8,
          }}
          onClick={openMenu}
        >
          <motion.span layoutId={`popover-label-${uniqueId}`}>
            Create Post
          </motion.span>
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={formContainerRef}
              layoutId={`popover-${uniqueId}`}
              className="relative h-[400px] left-0 mx-auto w-full shrink overflow-hidden border border-zinc-950/10 bg-white outline-none dark:bg-zinc-800"
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
                <motion.span
                  layoutId={`popover-label-${uniqueId}`}
                  aria-hidden="true"
                  style={{
                    opacity: inputData ? 0 : 1,
                  }}
                  className="absolute left-4 top-3 select-none text-sm text-zinc-500 dark:text-zinc-400"
                >
                  Write here...
                </motion.span>
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
                <textarea
                  name="content"
                  placeholder="Description"
                  className="h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none"
                  value={inputData.content}
                  onChange={(e) =>
                    setInputData({ ...inputData, content: e.target.value })
                  }
                />
                <div key="close" className="flex justify-between px-4 py-3">
                  <button
                    type="button"
                    className="flex items-center"
                    onClick={closeMenu}
                    aria-label="Close popover"
                  >
                    <ArrowLeftIcon
                      size={16}
                      className="text-zinc-900 dark:text-zinc-100"
                    />
                  </button>
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
