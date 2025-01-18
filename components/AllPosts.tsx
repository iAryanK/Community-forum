import { fetchAllPosts } from "@/lib/posts.action";
import PostCard from "./PostCard";
import Filter from "./Filter";
import { postFilters } from "@/constants";

const AllPosts = async ({
  search_param,
}: {
  search_param: string | string[] | undefined;
}) => {
  const posts = await fetchAllPosts({
    filter: search_param,
  });

  return (
    <div className="max-md:mt-5">
      <div className="flex justify-between items-center">
        <p className="text-xl font-semibold">All Posts</p>
        <Filter filters={postFilters} otherClasses="min-h-[50px]" />
      </div>
      {posts &&
        posts.length > 0 &&
        posts.map((post) => <PostCard key={post._id} post={post} showImage />)}
    </div>
  );
};

export default AllPosts;
