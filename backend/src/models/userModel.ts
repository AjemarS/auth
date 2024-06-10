import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  role: string;
}

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
export type { IUser };
