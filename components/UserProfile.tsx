import { auth, signIn } from "@/auth";
import { fetchUser } from "@/lib/users.action";
import Image from "next/image";
import { Button } from "./ui/button";
import { Smile } from "lucide-react";
import Link from "next/link";

const UserProfile = async () => {
  const session = await auth();
  let user;
  if (session?.user?.email) {
    user = await fetchUser(session.user?.email as unknown as string);
  }

  if (session)
    return (
      <div className="m-4 p-4 h-fit w-80 backdrop-blur-sm bg-secondary/30 rounded-lg motion-preset-slide-up">
        <div className="flex items-center flex-col">
          <div className="relative border-black">
            {session.user?.image ? (
              <Image
                src={session.user.image}
                alt="pic"
                width={100}
                height={100}
                className="p-1 rounded-full "
              />
            ) : (
              <Image
                src="https://github.com/shadcn.png"
                alt="pic"
                width={100}
                height={100}
                className="p-1 rounded-full"
              />
            )}
            <div className="absolute dark:bg-zinc-300 bg-zinc-800 text-white dark:text-black rounded-full p-1 bottom-2 right-0">
              <Smile size={16} />
            </div>
          </div>

          <h2 className="mb-1 font-lg">{user.name}</h2>

          <Button
            variant="secondary"
            className="w-full tracking-wide font-geist_mono dark:bg-gradient-to-r dark:from-[#C30F66] dark:to-[#C30F55] bg-[#C30F55] hover:bg-[#C30F55]/90"
            asChild
          >
            <Link href={`/users/${user._id}`} className="text-white">
              View Profile
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="m-4 p-4 h-fit w-80  backdrop-blur-sm bg-secondary/30 rounded-lg">
      <div className="flex items-center flex-col">
        <Image
          src="https://github.com/shadcn.png"
          alt="pic"
          width={100}
          height={100}
          className="p-1 rounded-full"
        />

        <h2 className="my-1 font-lg text-center text-sm text-muted-foreground">
          You are not logged in.
        </h2>
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <Button className="w-full tracking-wider font-geist_mono bg-gradient-to-r from-[#C30F66] to-[#C30F55] text-white">
            LogIn via Google
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
