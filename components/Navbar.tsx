import Image from "next/image";
import ThemeToggle from "./shared/ThemeToggle";
import { Button } from "./ui/button";
import { auth, signIn } from "@/auth";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = async () => {
  const session = await auth();
  return (
    <div className="m-4 px-4 py-3 flex items-center justify-between backdrop-blur-md bg-secondary/[0.8] rounded-lg">
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
  );
};

export default Navbar;
