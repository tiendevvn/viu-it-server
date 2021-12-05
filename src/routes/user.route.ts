import express, { Router } from "express";
import userController from "../controllers/user.controller";

const userRoute: Router = express.Router();

userRoute.get("/:student_id", userController.getUserByStudentId);

export default userRoute;
