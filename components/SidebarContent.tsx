"use client";

import { Bell, Shield, User } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Separator } from "./ui/separator";
import CreatePostDialog from "./CreatePostDialog";
import React from "react";

const SidebarContent = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="space-y-2">
      <Link
        href={`/users/${session.user.id}`}
        className="flex gap-2 items-center bg-secondary hover:bg-secondary/80 p-2 rounded-lg"
      >
        <User size={18} /> Profile
      </Link>
      {session.user.isAdmin && (
        <Link
          href={`/admin`}
          target="_blank"
          className="flex gap-2 items-center bg-secondary hover:bg-secondary/80 p-2 rounded-lg"
        >
          <Shield size={18} /> Admin
        </Link>
      )}
      <div className="flex gap-2 items-center hover:bg-secondary/80 p-1 rounded-lg">
        <CreatePostDialog authorId={session?.user?.id as unknown as string} />
      </div>
      <Separator />
      <div className="flex gap-2 items-center p-2 rounded-lg">
        <Bell size={18} /> Notifications
      </div>
      {children}
    </div>
  );
};

export default SidebarContent;
