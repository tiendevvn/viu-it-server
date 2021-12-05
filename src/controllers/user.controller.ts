import { Request, Response } from "express";
import statusCodes from "../helpers/statusCodes";
import messages from "../helpers/messages";
import User from "../models/user.model";

const userController = {
  getUserByStudentId: async (req: Request, res: Response) => {
    try {
      const user = await User.findOne({
        student_id: req.params.student_id,
      }).select("-password");

      return res.status(statusCodes.created).json({ user });
    } catch (error) {
      return res
        .status(statusCodes.serverError)
        .json({ message: messages.serverError });
    }
  },
};

export default userController;
