import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "todo must be more than 3 characters"],
      maxLength: [15, "todo must be less than 15 characters"],
    },
    status: {
      type: String,
      enum: ["new", "inProgress", "done"],
      default: "new",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      requried: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
