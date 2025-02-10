"use server";

import Post from "@/models/post.model";
import { connectToDB } from "./db";
import { revalidatePath } from "next/cache";
import User from "@/models/user.model";
import Comment from "@/models/comment.model";

interface CreatePostType {
  title: string;
  content: string;
  authorId: string;
  invite?: string[];
}

export const createPost = async (data: CreatePostType) => {
  try {
    const { title, content, authorId, invite } = data;

    await connectToDB();

    await Post.create({
      title,
      content,
      invite,
      author: authorId,
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log("[CREATE POST ERROR]", error);
    return false;
  }
};

export const fetchAllPosts = async ({
  filter,
}: {
  filter: string | string[] | undefined;
}) => {
  try {
    await connectToDB();

    let sortOptions = {};
    let query = {};
    switch (filter) {
      case "newest":
        sortOptions = { createdAt: -1 };
        break;

      case "most_viewed":
        sortOptions = { views: -1 };
        break;

      case "uncommented":
        query = { comments: { $size: 0 } };
        break;

      default:
        break;
    }

    query = { ...query, isApproved: true };
    const posts = await Post.find(query).populate("author").sort(sortOptions);

    return posts;
  } catch (error) {
    console.log("[FETCH ALL_POSTS ERROR]", error);
  }
};

export const fetchTrendingPosts = async () => {
  try {
    await connectToDB();

    const posts = await Post.find({ isApproved: true })
      .sort({ views: -1 })
      .limit(5);

    return posts;
  } catch (error) {
    console.log("[FETCH TRENDING POSTS ERROR]", error);
  }
};

export const fetchPostById = async (id: string) => {
  try {
    await connectToDB();

    const post = await Post.findById(id).populate("author");

    // Increment the views
    await Post.findByIdAndUpdate(id, {
      $inc: { views: 1 },
    });

    return post;
  } catch (error) {
    console.log("[FETCH POST BY ID ERROR", error);
  }
};

export const savePost = async (postId: string, authorId: string) => {
  try {
    await connectToDB();

    const isSaved = await User.findById(JSON.parse(authorId)).then((user) =>
      user.saved.includes(JSON.parse(postId))
    );

    if (isSaved) {
      await User.findByIdAndUpdate(JSON.parse(authorId), {
        $pull: { saved: JSON.parse(postId) },
      });
    } else {
      await User.findByIdAndUpdate(JSON.parse(authorId), {
        $push: { saved: JSON.parse(postId) },
      });
    }

    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.log("[SAVE POST ERROR]", error);
    return false;
  }
};

export const deletePost = async (postId: string) => {
  try {
    await connectToDB();

    const session = await Post.startSession();
    session.startTransaction();

    // Find the post and get its associated comment IDs
    const post = await Post.findById(postId).session(session);

    // Delete all comments associated with the post
    await Comment.deleteMany({ _id: { $in: post.comments } }).session(session);

    // Delete the post
    await Post.findByIdAndDelete(postId).session(session);

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return true;
  } catch (error) {
    console.log("[DELETE POST ERROR]", error);
    return false;
  }
};
