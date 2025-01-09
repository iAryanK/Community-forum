import Image from "next/image";
import ThemeToggle from "./shared/ThemeToggle";
import { Button } from "./ui/button";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="fixed w-full mt-5 px-5 z-50">
      <div className="max-w-3xl w-full outline outline-muted/40 mx-auto px-4 py-3 flex items-center justify-between backdrop-blur-sm bg-secondary/30 rounded-3xl">
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={40}
          className="dark:invert"
        />

        <div className="flex items-center gap-2">
          <ThemeToggle />

          {session ? (
            <ProfileDropdown />
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
