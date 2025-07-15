import mongoose from "mongoose";
// import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      minLength: [3, "length must me more than 3 characters"],
      maxLength: [15, "length must me less than 15 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
// userSchema.pre("save", async function () {
//   const salt = await bcrypt.genSalt(10);

// })

export default User;
