import PostApprovalCard from "@/components/admin/PostApprovalCard";
import { fetchPostsToApprove } from "@/lib/admin.action";

const Page = async () => {
  const posts = await fetchPostsToApprove();
  return (
    <div className="md:w-1/2 space-y-2">
      {posts &&
        posts.map((post) => (
          <PostApprovalCard key={post._id} post={post} showImage />
        ))}
    </div>
  );
};

export default Page;
