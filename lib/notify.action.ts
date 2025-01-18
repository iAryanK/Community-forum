"use server";

import Notify from "@/models/notify.model";
import { connectToDB } from "./db";

export const fetchNotifications = async (receiver: string) => {
  try {
    await connectToDB();

    const notifications = await Notify.find({ receiver }).sort({
      createdAt: -1,
    });

    return notifications;
  } catch (error) {
    console.log("[FETCH NOTIFICATIONS ERROR]: ", error);
  }
};

export const sendPostApprovalNotification = async (
  receiver: string,
  content: string,
  type: string
) => {
  try {
    await connectToDB();

    await Notify.create({
      receiver,
      content,
      type,
    });
  } catch (error) {
    console.log("[SEND POST APPROVAL NOTIFICATION ERROR]: ", error);
  }
};
