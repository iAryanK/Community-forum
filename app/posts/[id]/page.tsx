import { Button } from "@/components/ui/button";
import { fetchPostById } from "@/lib/posts.action";
import { formatDate, formatNumber, getTimestamp } from "@/lib/utils";
import {
  Clock,
  Eye,
  MessageSquareText,
  Star,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await fetchPostById(id);

  const dummyComment = [
    {
      _id: "1",
      content:
        "This is a comment content. This is also a comment. and this is fore sure a comment",
      upvotes: 10,
      downvotes: 2,
      createdAt: new Date(),
      author: {
        name: "John Doe",
        image: "/google.svg",
      },
    },
    {
      _id: "2",
      content:
        "This is a comment content. This is also a comment. and this is fore sure a comment",
      upvotes: 10,
      downvotes: 2,
      createdAt: new Date(),
      author: {
        name: "John Doe",
        image: "/google.svg",
      },
    },
  ];

  return (
    <div className="m-4 p-4 w-full backdrop-blur-sm bg-secondary/30 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-4 items-center">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={28}
            height={28}
            className="rounded-full"
          />
          <p>{post.author.name}</p>
        </div>
        <Star />
      </div>

      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>

      <div className="flex gap-5 mb-4 text-zinc-400 font-geist_mono">
        <p className="flex gap-2 items-center">
          <Clock size={16} /> {formatDate(post.createdAt)}
        </p>
        <p className="flex gap-2 items-center">
          <Eye size={16} /> {formatNumber(post.views)}
        </p>
        <p className="flex gap-2 items-center">
          <MessageSquareText size={16} /> {formatNumber(post.comments.length)}
        </p>
      </div>
      <h3 className="font-light">{post.content}</h3>

      <div className="py-5 text-amber-500 text-lg">
        {formatNumber(post.comments.length)} Comments
      </div>

      <textarea
        placeholder="Add a comment"
        className="w-full p-2 border border-secondary rounded-lg"
      />
      <Button
        variant={"secondary"}
        className="mt-2 w-full font-geist_mono text-base"
      >
        Comment
      </Button>

      <div className="mt-8 space-y-5">
        <div className="text-lg text-amber-500">All Comments</div>
        {dummyComment.map((comment) => (
          <CommentCard key={comment._id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Page;

export const CommentCard = ({ comment }: { comment: any }) => {
  return (
    <div className="p-2">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={comment.author.image}
            alt={comment.author.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p>{comment.author.name}</p>
        </div>
        <div className="flex gap-4">
          <button className="flex gap-2 items-center">
            <ThumbsUp size={20} />
            {comment.upvotes}
          </button>
          <button className="flex gap-2 items-center">
            <ThumbsDown size={20} />
            {comment.downvotes}
          </button>
        </div>
      </div>
      <p className="pt-4 pb-2 font-light">{comment.content}</p>

      <p className="text-zinc-400 font-geist_mono">
        - created {getTimestamp(comment.createdAt)}
      </p>
    </div>
  );
};
