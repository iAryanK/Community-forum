/* eslint-disable @typescript-eslint/no-explicit-any */
import { auth } from "@/auth";
import PostCard from "@/components/PostCard";
import {
  fetchPostOfUser,
  fetchSavedPosts,
  fetchUserData,
} from "@/lib/users.action";
import { getTimestamp } from "@/lib/utils";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const session = await auth();

  const user = await fetchUserData(id);
  const userPosts = await fetchPostOfUser(id);

  let savedPosts = [];
  if (session?.user?.id === id) {
    console.log("[fetchSavedPosts]", id);

    savedPosts = await fetchSavedPosts(id);
  }

  return (
    <div className="m-4 h-fit w-full rounded-lg">
      <div className="p-4 border-2 border-dashed h-48 rounded-lg flex flex-col gap-4 items-start justify-between backdrop-blur-sm bg-secondary/30 mb-5">
        <div className="flex gap-2 items-center">
          {user.image ? (
            <Image
              src={user.image}
              alt="pic"
              width={200}
              height={200}
              className="p-1 rounded-full h-28 w-28 "
            />
          ) : (
            <div className="rounded-full h-28 w-28 bg-secondary-foreground"></div>
          )}

          <div className="w-full flex flex-col gap-4">
            <div>
              <h2 className="font-lg text-lg font-geist_mono">{user.name}</h2>
              <p className="text-sm font-geist_mono opacity-50">
                {session?.user?.email == user.email && user.email}
              </p>
              <div>
                <p className="pt-4 text-sm">
                  {userPosts.length} posts created.
                </p>
                <p className="pt-1 opacity-60 text-sm">
                  - Joined {getTimestamp(user.joinedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {session?.user?.id === id && (
          <p className="text-sm text-zinc-400 dark:text-zinc-600 ml-5">
            * Your email ID is only visible to you.
          </p>
        )}
      </div>
      {session?.user?.id !== id ? (
        <div>
          <p className="my-2 text-xl font-semibold font-geist_mono">
            Posts by{" "}
            {user.email === session?.user?.email ? "You" : `${user.name}`}
          </p>
          <hr className="w-1/2" />
          <div className="flex flex-col gap-1">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </div>
      ) : (
        <Tabs defaultValue="your_posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="your_posts" className="w-full">
              Your Posts
            </TabsTrigger>
            <TabsTrigger value="saved_posts" className="w-full">
              Saved Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="your_posts">
            <div className="flex flex-col gap-1">
              {userPosts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="saved_posts">
            <div className="flex flex-col gap-1">
              {savedPosts.saved.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Page;
