import { Schema, model, connect } from "mongoose";

interface Task {
  title: string;
  content: string;
  date: string;
  time: string;
}

interface IUser {
  username: string;
  tasks: Task[];
}

const userSchema = new Schema<IUser>({
  username: { type: String, require: true },
  tasks: [
    {
      title: String,
      content: String,
      date: String,
      time: String,
    },
  ],
});
const User = model<IUser>("User", userSchema);

export default User;
