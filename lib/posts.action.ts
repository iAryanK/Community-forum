"use server";

import Post from "@/models/post.model";
import { connectToDB } from "./db";
import console from "console";

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

    const created = await Post.create({
      title,
      content,
      author: authorId,
    });
    console.log("created post:", created);

    return true;
  } catch (error) {
    console.log("[CREATE POST ERROR]", error);
    return false;
  }
};
