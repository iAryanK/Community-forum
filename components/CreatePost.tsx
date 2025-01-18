import { auth } from "@/auth";
import CreatePostDialog from "./CreatePostDialog";

const CreatePost = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <div className="border-2 border-dashed border-black dark:border-zinc-400 p-4 rounded-lg space-y-2 mb-5 motion-preset-fade md:w-80 md:m-4 md:motion-preset-slide-up">
      <h3 className="text-xl font-geist_mono">Hello {session?.user?.name}</h3>
      <p className="text-muted-foreground text-sm tracking-wide">
        What&apos;s going on in your mind today ? Is there something you want to
        talk about, related to big data and its impact on sectors like
        healthcare ?
      </p>
      <div className="w-full">
        <CreatePostDialog authorId={session?.user?.id as unknown as string} />
      </div>
    </div>
  );
};

export default CreatePost;
