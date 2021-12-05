import express, { Router } from "express";
import authRoute from "./auth.route";
import userRoute from "./user.route";

const routes: Router = express.Router();

routes.use("/auth", authRoute);
routes.use("/user", userRoute);

export default routes;
