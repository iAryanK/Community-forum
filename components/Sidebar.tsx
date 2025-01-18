/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { fetchNotifications } from "@/lib/notify.action";
import { NotifyType } from "@/models/notify.model";
import { getTimestamp } from "@/lib/utils";

const Sidebar = async () => {
  const session = await auth();

  const notifications = await fetchNotifications(session?.user.id as string);

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
      <SheetContent className="py-10  flex flex-col justify-between backdrop-blur-sm bg-secondary/90 overflow-y-scroll custom-scrollbar">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SidebarContent>
          <div className="overflow-y-scroll custom-scrollbar max-h-96 min-h-60 space-y-2 gradient-fade">
            {notifications ? (
              notifications.map((notification: any, index: number) => (
                <div
                  key={index}
                  className="gap-2 bg-secondary hover:bg-secondary/80 p-2 rounded-lg"
                >
                  {notification.type === NotifyType.PostApproval && (
                    <div className="space-y-2">
                      <p className="font-light leading-tight text-sm">
                        Your post titled &apos;{" "}
                        <strong>{notification.content}</strong> &apos; has been
                        approved !
                      </p>
                      <p className="text-xs font-geist_mono font-light">
                        {getTimestamp(notification.createdAt)}
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="opacity-50 text-center">No New Notifications</div>
            )}
          </div>
        </SidebarContent>
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
