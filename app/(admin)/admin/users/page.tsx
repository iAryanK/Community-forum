import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { fetchAllUsers } from "@/lib/admin.action";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const page = async () => {
  const session = await auth();
  const users = await fetchAllUsers();

  return (
    <div className="space-y-4">
      {users &&
        users.map(
          (user) =>
            session?.user?.email !== user.email && (
              <div key={user._id}>
                <div
                  key={user._id}
                  className="flex flex-col p-4 bg-secondary/50 hover:bg-secondary/60 rounded-lg md:w-1/2 gap-2"
                >
                  <div className="flex items-start justify-between  gap-5">
                    <div className="flex items-center gap-4">
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-lg font-semibold">{user.name}</p>
                        <p className="text-gray-500 text-sm">{user.email}</p>
                      </div>
                    </div>
                    <div className="bg-amber-600 rounded-full px-2 font-geist_mono text-sm">
                      {user.isAdmin ? "Admin" : "User"}
                    </div>
                  </div>
                  <div className="flex w-full justify-between items-center">
                    <div className="font-geist_mono text-xs rounded-lg">
                      - Joined {formatDate(user.joinedAt)}
                    </div>
                    <div className="flex gap-2">
                      <Button variant={"secondary"}>
                        {user.isAdmin ? "Remove admin" : "Make admin"}
                      </Button>
                      <Button variant={"secondary"} disabled>
                        Ban user
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
    </div>
  );
};

export default page;
