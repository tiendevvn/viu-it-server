import express, { Router } from "express";
import authController from "../controllers/auth.controller";
import authValidate from "../validations/auth";
import authMiddleware from "../middlewares/auth";

const authRoute: Router = express.Router();

authRoute.post(
  "/signup",
  authValidate.validateSignUp,
  authValidate.isValidated,
  authMiddleware.checkStudentIdExists,
  authMiddleware.checkEmailExists,
  authMiddleware.checkPhoneNumberExists,
  authController.signUp
);
authRoute.post(
  "/signin",
  authValidate.validateSignIn,
  authValidate.isValidated,
  authMiddleware.checkSignIn,
  authController.signIn
);
authRoute.post("/signout", authController.signOut);
authRoute.post(
  "/refreshtoken",
  authMiddleware.checkAccount,
  authController.refreshToken
);

export default authRoute;
