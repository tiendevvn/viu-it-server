import { Request, Response, NextFunction } from "express";
import {
  check,
  validationResult,
  ValidationError,
  Result,
} from "express-validator";
import statusCodes from "../helpers/statusCodes";

const isValidated = (req: Request, res: Response, next: NextFunction) => {
  const errors: Result<ValidationError> = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessage = errors.array()[0].msg;

    return res.status(statusCodes.badRequest).json({ message: errorMessage });
  } else {
    next();
  }
};

const validateSignUp = [
  check("student_id")
    .notEmpty()
    .withMessage("Nhập mã sinh viên")
    .isNumeric()
    .withMessage("Mã sinh viên phải là số")
    .trim(),
  check("name")
    .notEmpty()
    .withMessage("Nhập tên")
    .isLength({ min: 3, max: 20 })
    .withMessage("Tên phải nằm trong khoảng 3-20 ký tự")
    .trim(),
  check("email")
    .notEmpty()
    .withMessage("Nhập email")
    .isEmail()
    .withMessage("Email không hợp lệ")
    .trim()
    .escape(),
  check("phone_number")
    .notEmpty()
    .withMessage("Nhập số điện thoại")
    .isNumeric()
    .withMessage("Số điện thoại phải là số")
    .trim(),
  check("birthday").notEmpty().withMessage("Nhập ngày sinh").trim(),
  check("gender").notEmpty().withMessage("Chọn giới tính").trim(),
  check("password")
    .notEmpty()
    .withMessage("Nhập mật khẩu")
    .isLength({ min: 6 })
    .withMessage("Mật khẩu tối thiểu là 6 ký tự")
    .trim(),
];

const validateSignIn = [
  check("student_id")
    .notEmpty()
    .withMessage("Nhập mã sinh viên")
    .isNumeric()
    .withMessage("Mã sinh viên phải là số")
    .trim(),
  check("password").notEmpty().withMessage("Nhập mật khẩu").trim(),
];

export default { isValidated, validateSignUp, validateSignIn };
