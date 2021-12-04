import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import statusCodes from "../helpers/statusCodes";
import messages from "../helpers/messages";
import { isPasswordValid } from "../helpers";
import User, { IUserProps } from "../models/user.model";

const checkStudentIdExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { student_id } = <IUserProps>req.body;

  const foundUser = await User.findOne({ student_id });

  if (foundUser)
    return res
      .status(statusCodes.badRequest)
      .json({ message: messages.studentIdExists });

  next();
};

const checkEmailExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = <IUserProps>req.body;

  const foundUser = await User.findOne({ email });

  if (foundUser)
    return res
      .status(statusCodes.badRequest)
      .json({ message: messages.emailExists });

  next();
};

const checkPhoneNumberExists = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phone_number } = <IUserProps>req.body;

  const foundUser = await User.findOne({ phone_number });

  if (foundUser)
    return res
      .status(statusCodes.badRequest)
      .json({ message: messages.phoneNumberExists });

  next();
};

const checkSignIn = async (req: Request, res: Response, next: NextFunction) => {
  const { student_id, password } = <IUserProps>req.body;

  const foundUser = await User.findOne({ student_id });

  if (!foundUser)
    return res
      .status(statusCodes.notFound)
      .json({ message: messages.loginError });

  const passwordsMatch = await isPasswordValid(password, foundUser.password);

  if (!passwordsMatch)
    return res
      .status(statusCodes.notFound)
      .json({ message: messages.loginError });

  req.account = <IUserProps>{
    ...foundUser._doc,
    password: "",
  };

  next();
};

const checkAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken = req.cookies.refreshtoken;

  if (!refreshToken)
    return res
      .status(statusCodes.unauthorized)
      .json({ message: messages.unauthorized });

  const decoded = (await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  )) as { id: string };

  if (!decoded)
    return res
      .status(statusCodes.unauthorized)
      .json({ message: messages.unauthorized });

  const foundUser = await User.findById(decoded.id).select("-password");

  if (!foundUser)
    return res
      .status(statusCodes.notFound)
      .json({ message: messages.loginError });

  req.account = <IUserProps>{
    ...foundUser._doc,
    password: "",
  };

  next();
};

export default {
  checkStudentIdExists,
  checkEmailExists,
  checkPhoneNumberExists,
  checkSignIn,
  checkAccount,
};
