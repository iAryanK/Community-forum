"use server";

import Post from "@/models/post.model";
import { connectToDB } from "./db";
import console from "console";
import { revalidatePath } from "next/cache";

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
