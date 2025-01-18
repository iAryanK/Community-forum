import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { auth } from "@/auth";
import SidebarContent from "./SidebarContent";
import Logout from "./Logout";
import ThemeToggle from "./shared/ThemeToggle";
import { Separator } from "./ui/separator";

const Sidebar = async () => {
  const session = await auth();

  if (!session) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <div className="border p-1 rounded-full flex gap-1 items-center">
          <Image
            src={session.user.image}
            height={28}
            width={28}
            alt="pic"
            className="rounded-full"
          />
          <p className="text-sm">{session.user.name.split(" ")[0]}</p>
          <ChevronRight size={18} />
        </div>
      </SheetTrigger>
      <SheetContent className="py-10 space-y-2 flex flex-col justify-between backdrop-blur-sm bg-secondary/80">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SidebarContent />
        <div className="space-y-2">
          <Separator />
          <div className="flex gap-2 items-center">
            <Logout />
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
