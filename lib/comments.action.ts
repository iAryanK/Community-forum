"use server";

import Comment from "@/models/comment.model";
import { connectToDB } from "./db";
import Post from "@/models/post.model";
import { revalidatePath } from "next/cache";

const createComment = async (
  authorId: string,
  postId: string,
  comment: string
) => {
  try {
    await connectToDB();

    const createdComment = await Comment.create({
      author: authorId,
      content: comment,
    });

    await Post.findByIdAndUpdate(JSON.parse(postId), {
      $push: { comments: createdComment._id },
    });

    revalidatePath(`/posts/${postId}`);
    return true;
  } catch (error) {
    console.log("[CREATE COMMENT ERROR]", error);
    return false;
  }
};

const upvoteComment = async (
  userId: string,
  commentId: string,
  postId: string
) => {
  try {
    await connectToDB();

    // check if user already exists in upvotes array
    const comment = await Comment.findById(JSON.parse(commentId));

    if (comment.upvotes.includes(userId)) {
      // remove user from upvotes array
      await comment.updateOne({ $pull: { upvotes: userId } });
    } else {
      // add user to upvotes array
      await comment.updateOne({ $push: { upvotes: userId } });
      // remove user from downvotes array, if exists
      await comment.updateOne({ $pull: { downvotes: userId } });
    }

    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.log("[LIKE COMMENT ERROR]", error);
  }
};

const downvoteComment = async (
  userId: string,
  commentId: string,
  postId: string
) => {
  try {
    await connectToDB();

    // check if user already exists in downvotes array
    const comment = await Comment.findById(JSON.parse(commentId));

    if (comment.downvotes.includes(userId)) {
      // remove user from downvotes array
      await comment.updateOne({ $pull: { downvotes: userId } });
    } else {
      // add user to downvotes array
      await comment.updateOne({ $push: { downvotes: userId } });
      // remove user from upvotes array, if exists
      await comment.updateOne({ $pull: { upvotes: userId } });
    }

    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.log("[LIKE COMMENT ERROR]", error);
  }
};

const getCommentById = async (id: string) => {
  try {
    await connectToDB();

    const comment = await Comment.findById(id).populate("author");

    return comment;
  } catch (error) {
    console.log("[GET COMMENT BY ID ERROR]", error);
  }
};

export { createComment, upvoteComment, downvoteComment, getCommentById };
