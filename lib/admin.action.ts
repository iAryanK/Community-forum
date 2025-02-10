"use server";

import Post from "@/models/post.model";
import { connectToDB } from "./db";
import User from "@/models/user.model";
import { sendPostApprovalNotification } from "./notify.action";
import { NotifyType } from "@/models/notify.model";
import { sendInvitationMail } from "./mail.action";

const countUsers = async () => {
  try {
    await connectToDB();

    const count = await User.countDocuments();

    return count;
  } catch (error) {
    console.log("[COUNT USERS ERROR]", error);
  }
};

const countPosts = async () => {
  try {
    await connectToDB();

    const count = await Post.countDocuments();

    return count;
  } catch (error) {
    console.log("[COUNT POSTS ERROR]", error);
  }
};

const fetchPostsToApprove = async () => {
  try {
    await connectToDB();

    const posts = await Post.find({ isApproved: false }).populate("author");

    return posts;
  } catch (error) {
    console.log("[FETCH POSTS TO APPROVE ERROR]", error);
  }
};

const approvePost = async (postId: string) => {
  try {
    await connectToDB();

    const post = await Post.findById(JSON.parse(postId));

    post.isApproved = true;

    post.save();

    await sendPostApprovalNotification(
      post.author._id,
      post.title,
      NotifyType.PostApproval
    );

    sendInvitationMail(post.invite, post._id, post.title);

    return true;
  } catch (error) {
    console.log("[APPROVE POST ERROR]", error);
    return false;
  }
};

const countPostsToApprove = async () => {
  try {
    await connectToDB();

    const count = await Post.countDocuments({ isApproved: false });

    return count;
  } catch (error) {
    console.log("[COUNT POSTS TO APPROVE ERROR]", error);
  }
};

const fetchAllUsers = async () => {
  try {
    await connectToDB();

    const users = await User.find();

    return users;
  } catch (error) {
    console.log("[FETCH ALL USERS ERROR]", error);
  }
};

const postsCreatedToday = async () => {
  try {
    await connectToDB();

    const posts = await Post.find({
      createdAt: {
        $gte: new Date(new Date().setHours(0o0, 0o0, 0o0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
      isApproved: true,
    }).sort({ createdAt: -1 });

    return posts;
  } catch (error) {
    console.log("[POSTS CREATED TODAY ERROR]", error);
  }
};

const usersJoinedToday = async () => {
  try {
    await connectToDB();

    const users = await User.find({
      joinedAt: {
        $gte: new Date(new Date().setHours(0, 0, 0)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    }).sort({ joinedAt: -1 });

    return users;
  } catch (error) {
    console.log("[USERS JOINED TODAY ERROR]", error);
  }
};

export {
  countUsers,
  countPosts,
  fetchPostsToApprove,
  approvePost,
  countPostsToApprove,
  fetchAllUsers,
  postsCreatedToday,
  usersJoinedToday,
};
