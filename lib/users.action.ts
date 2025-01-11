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
