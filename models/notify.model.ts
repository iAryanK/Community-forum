import { Schema, model, models, Document } from "mongoose";

export enum NotifyType {
  PostApproval = "PostApproval",
  PostComment = "PostComment",
}

export interface INotify extends Document {
  receiver: string;
  content: string;
  type: NotifyType;
  createdAt: Date;
}

const NotifySchema = new Schema({
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
  content: { type: String },
  type: { type: String, enum: Object.values(NotifyType) },
  createdAt: { type: Date, default: Date.now },
});

const Notify = models.Notify || model<INotify>("Notify", NotifySchema);

export default Notify;
