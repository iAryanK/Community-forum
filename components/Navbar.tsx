import Image from "next/image";
import { Button } from "./ui/button";
import { auth, signIn } from "@/auth";
import Link from "next/link";
import Sidebar from "./Sidebar";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="fixed w-full mt-5 px-5 z-50">
      <div className="max-w-4xl w-full outline outline-muted/40 mx-auto px-4 py-3 flex items-center justify-between backdrop-blur-sm bg-secondary/30 rounded-3xl motion-preset-fade">
        <Link href="/" className="relative hover:motion-preset-confetti">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={40}
            className="dark:invert"
            priority
          />
          <p className="uppercase text-[10px] absolute -bottom-[6px] right-0 tracking-widest font-geist_mono text-secondary-foreground">
            Community
          </p>
        </Link>

        <div className="flex items-center gap-2">
          {session ? (
            <Sidebar />
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
            >
              <Button>
                <Image
                  src="/google.svg"
                  width={16}
                  height={16}
                  alt="google"
                  className="dark:invert"
                />
                <span className="font-medium font-geist_mono">LogIn</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
