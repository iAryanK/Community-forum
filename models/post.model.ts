import { Schema, model, models, Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  views: number;
  author: Schema.Types.ObjectId;
  comments: Schema.Types.ObjectId[];
  isApproved: boolean;
  invite?: string[];
  createdAt: Date;
}

const PostSchema = new Schema({
  title: { type: String },
  content: { type: String },
  views: { type: Number, default: 0 },
  author: { type: Schema.Types.ObjectId, ref: "User" },
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  isApproved: { type: Boolean, default: false },
  invite: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
});

const Post = models.Post || model<IPost>("Post", PostSchema);

export default Post;
