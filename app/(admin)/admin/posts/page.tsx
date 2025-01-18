import PostApprovalCard from "@/components/admin/PostApprovalCard";
import { fetchPostsToApprove, postsCreatedToday } from "@/lib/admin.action";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Page = async () => {
  const [posts, latestPosts] = await Promise.all([
    fetchPostsToApprove(),
    postsCreatedToday(),
  ]);

  return (
    <div className="md:w-1/2 space-y-2">
      <Tabs defaultValue="posts_to_approve">
        <TabsList className="w-full">
          <TabsTrigger value="posts_to_approve" className="w-full">
            Posts to Approve
          </TabsTrigger>
          <TabsTrigger value="latest_posts" className="w-full">
            Latest Posts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts_to_approve">
          {posts &&
            posts.map((post) => (
              <PostApprovalCard key={post._id} post={post} showImage />
            ))}
        </TabsContent>
        <TabsContent value="latest_posts">
          {latestPosts &&
            latestPosts.map((post) => (
              <PostApprovalCard key={post._id} post={post} showImage approved />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
