import StatCard from "@/components/admin/StatCard";
import {
  countPosts,
  countPostsToApprove,
  countUsers,
} from "@/lib/admin.action";
import { CircleEllipsis, NotebookText, Users } from "lucide-react";
import React from "react";

const Page = async () => {
  const [userCount, postCount, postToApproveCount] = await Promise.all([
    countUsers(),
    countPosts(),
    countPostsToApprove(),
  ]);

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
      <StatCard
        title="Total Users"
        description="Total number of users"
        statValue={userCount}
        icon={<Users color="#fff" size={18} className="mr-2" />}
      />
      <StatCard
        title="Total Posts"
        description="Total number of posts"
        statValue={postCount}
        icon={<NotebookText color="#fff" size={18} className="mr-2" />}
      />
      <StatCard
        title="Posts to Approve"
        description="These posts require approval"
        statValue={postToApproveCount}
        icon={<CircleEllipsis color="#fff" size={18} className="mr-2" />}
      />
    </div>
  );
};

export default Page;
