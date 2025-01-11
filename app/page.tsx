import AllPosts from "@/components/AllPosts";
import CreatePost from "@/components/CreatePost";
import Welcome from "@/components/Welcome";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const search_param = (await searchParams).filter;

  return (
    <div className="m-5 w-full">
      <Welcome />
      <CreatePost />
      <AllPosts search_param={search_param} />
    </div>
  );
}
