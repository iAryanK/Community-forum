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
import { Plus, User } from "lucide-react";
import Logout from "./Logout";
import Link from "next/link";

const ProfileDropdown = async () => {
  const session = await auth();

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
        <Link href={`/`}>
          <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
            <Plus /> Create
          </DropdownMenuItem>
        </Link>
        <Link href={`/users/${session?.user?.id}`}>
          <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
            <User /> Profile
          </DropdownMenuItem>
        </Link>
        {session?.user?.isAdmin && (
          <Link href={`/admin`} target="_blank">
            <DropdownMenuItem className="cursor-pointer hover:bg-secondary">
              <User /> Admin
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem asChild>
          <Logout />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
