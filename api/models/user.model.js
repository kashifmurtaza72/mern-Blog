import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

//After creating Schema, we need to create Model
const User = mongoose.model("User", userSchema); //Name should be capital, We don't put 's' because Mongodb going to  add it automatically. 

export default User; // export it default so we can use it in other places in our application, when we need it. so model is created now, we'll use it later when we are Signing up user or update them. 