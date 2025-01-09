import { auth } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "lucide-react";
import Logout from "./Logout";

const ProfileDropdown = async () => {
  const session = await auth();
  console.log(session);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        {session && (
          <div className="flex items-center gap-2">
            <Avatar>
              {session.user?.image ? (
                <AvatarImage
                  src={session.user.image}
                  alt="pic"
                  className="p-1 rounded-full"
                />
              ) : (
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="pic"
                  className="p-1 rounded-full"
                />
              )}
              <AvatarFallback>
                <Skeleton className="w-[36px] h-[36px] rounded-full" />
              </AvatarFallback>
            </Avatar>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User /> Profile
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
