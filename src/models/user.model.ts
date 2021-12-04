import { Document, Schema, model } from "mongoose";

export interface IUser {
  student_id: string;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  birthday: string;
  profile_picture: string;
  cover_photo: string;
  gender: string;
  bio: string;
  website: string;
  hometown: string;
  location: string;
  class_name: string;
  major: string;
  status: string;
  role: string;
  themes: string;
  languages: string;
  type: string;
  following: string[];
  followers: string[];
}

export interface IUserDoc extends Document, IUser {
  _doc: IUser;
}

export interface IUserProps extends IUserDoc {
  _id: string;
}

const userSchema = new Schema(
  {
    student_id: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
    },
    phone_number: {
      type: String,
      unique: true,
      trim: true,
    },
    birthday: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_picture: {
      type: String,
      default:
        "https://res.cloudinary.com/tiendevvn/image/upload/v1638637522/viu-it/profile-picture_kxq5rk.png",
    },
    cover_photo: {
      type: String,
      default:
        "https://res.cloudinary.com/tiendevvn/image/upload/v1638637522/viu-it/cover-photo_gxc4v6.png",
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female"],
    },
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    hometown: {
      type: String,
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    class_name: {
      type: String,
      default: "",
    },
    major: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Normal", "Ban"],
      default: "Normal",
    },
    role: {
      type: String,
      enum: ["User", "Admin"],
      default: "User",
    },
    themes: {
      type: String,
      enum: ["Light", "Dark"],
      default: "Light",
    },
    languages: {
      type: String,
      enum: ["En", "Vi"],
      default: "Vi",
    },
  },
  { timestamps: true }
);

const User = model<IUserDoc>("User", userSchema);

export default User;
