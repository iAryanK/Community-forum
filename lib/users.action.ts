"use server";

import User from "@/models/user.model";
import { connectToDB } from "./db";
import Post from "@/models/post.model";

export const fetchUser = async (email: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email });
    if (user) return user;
  } catch (error) {
    console.log("[FETCH USER ERROR]", error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchUserById = async (id: any) => {
  try {
    await connectToDB();

    const user = await User.findById(id);
    if (user) return user;
  } catch (error) {
    console.log("[FETCH USER BY ID ERROR]", error);
  }
};

export const fetchUserData = async (id: string) => {
  try {
    await connectToDB();

    const res = await User.findById(id);
    if (res) return res;
  } catch (error) {
    console.log("[FETCH USER DATA ERROR]", error);
  }
};

export const fetchPostOfUser = async (id: string) => {
  try {
    await connectToDB();

    const res = await Post.find({
      author: id,
    });

    return res;
  } catch (error) {
    console.log("[FETCH POST OF USER ERROR]", error);
    return [];
  }
};
