import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/app-sidebar";
import "./index.css";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.isAdmin)
    redirect("/");
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <div className="p-4 w-full">{children}</div>
      </main>
    </SidebarProvider>
  );
}
