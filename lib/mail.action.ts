"use server";

import nodemailer from "nodemailer";

export const sendInvitationMail = async (
  to: string[],
  postId: string,
  postTitle: string
) => {
  // Create a transporter object
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Configure the mailoptions object
  const mailOptions = {
    from: `"Community Forum" <${process.env.MAIL_USER}>`,
    to: to[0],
    subject: `Invite: ${postTitle}`,
    html: `<p>You have been invited to collaborate on a post on community forum, titled <em>${postTitle}</em>. <br/> Click <a href="https://community-forum.vercel.app/posts/${postId}">here</a> to view the post.</p>`,
  };

  // Send the email
  await transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
