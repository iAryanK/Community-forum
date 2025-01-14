import { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image: string;
  bio?: string;
  portfolioWebsite?: string;
  saved: Schema.Types.ObjectId[];
  isAdmin: boolean;
  joinedAt: Date;
}

const UserSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  bio: { type: String },
  portfolioWebsite: { type: String },
  saved: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  isAdmin: { type: Boolean, default: false},
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
