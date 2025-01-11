"use server";

import Post from "@/models/post.model";
import { connectToDB } from "./db";
import console from "console";
import { revalidatePath } from "next/cache";
import User from "@/models/user.model";

interface CreatePostType {
  title: string;
  content: string;
  authorId: string;
}

export const createPost = async (data: CreatePostType) => {
  try {
    console.log("[CREATE POST]");
    const { title, content, authorId } = data;

    await connectToDB();

    await Post.create({
      title,
      content,
      author: authorId,
    });

    revalidatePath("/");
    return true;
  } catch (error) {
    console.log("[CREATE POST ERROR]", error);
    return false;
  }
};

export const fetchAllPosts = async () => {
  try {
    await connectToDB();

    const posts = await Post.find({})
      .populate("author")
      .sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log("[FETCH ALL_POSTS ERROR]", error);
  }
};

export const fetchTrendingPosts = async () => {
  try {
    await connectToDB();

    const posts = await Post.find({}).sort({ views: -1 }).limit(5);

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
