"use server";

import User from "@/models/user.model";
import { connectToDB } from "./db";

export const fetchUser = async (email: string) => {
  try {
    await connectToDB();

    const user = await User.findOne({ email });
    if (user) return user;
  } catch (error) {
    console.log("[FETCH USER ERROR]", error);
  }
};
