import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { AdminNavItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "../shared/ThemeToggle";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroupLabel className="my-5 flex justify-center">
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
        </SidebarGroupLabel>

        <SidebarGroupContent className="h-full">
          <div className="flex flex-col justify-between h-full">
            <SidebarMenu className="px-2">
              {AdminNavItems.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-1">
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <ThemeToggle />
          </div>
        </SidebarGroupContent>
      </SidebarContent>
    </Sidebar>
  );
}
