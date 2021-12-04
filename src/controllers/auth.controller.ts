import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import messages from "../helpers/messages";
import {
  generateAccessToken,
  generateHashedPassword,
  generateRefreshToken,
  generateSalt,
} from "../helpers";
import User, { IUserProps } from "../models/user.model";

const authController = {
  signUp: async (req: Request, res: Response) => {
    try {
      let {
        student_id,
        name,
        email,
        phone_number,
        birthday,
        gender,
        password,
      } = <IUserProps>req.body;

      const salt = await generateSalt();

      password = await generateHashedPassword(password, salt);

      const newUser = new User({
        student_id,
        name,
        email,
        phone_number,
        birthday,
        gender,
        password,
      });

      await newUser.save();

      return res
        .status(statusCodes.created)
        .json({ message: messages.signUpSuccess });
    } catch (error) {
      return res
        .status(statusCodes.serverError)
        .json({ message: messages.serverError });
    }
  },
  signIn: async (req: Request, res: Response) => {
    try {
      const profile = req.account;

      const accessToken = await generateAccessToken({ id: profile._id });
      const refreshToken = await generateRefreshToken({ id: profile._id });

      res.cookie("refreshtoken", refreshToken, {
        secure: false,
        httpOnly: true,
        path: "/api/auth/refreshtoken",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });

      return res.status(statusCodes.created).json({
        message: messages.loggedInSuccessfully,
        token: accessToken,
        profile,
      });
    } catch (error) {
      return res
        .status(statusCodes.serverError)
        .json({ message: messages.serverError });
    }
  },
  signOut: async (req: Request, res: Response) => {
    try {
      res.clearCookie("refreshtoken", { path: "/api/auth/refreshtoken" });

      return res
        .status(statusCodes.created)
        .json({ message: messages.signOutSuccessful });
    } catch (error) {
      return res
        .status(statusCodes.serverError)
        .json({ message: messages.serverError });
    }
  },
  refreshToken: async (req: Request, res: Response) => {
    try {
      const profile = req.account;

      const accessToken = await generateAccessToken({ id: profile._id });

      return res
        .status(statusCodes.created)
        .json({ token: accessToken, profile });
    } catch (error) {
      return res
        .status(statusCodes.serverError)
        .json({ message: messages.serverError });
    }
  },
};

export default authController;
