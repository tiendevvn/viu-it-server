import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isPasswordValid = async (password: string, dbPassword: string) =>
  await bcrypt.compare(password, dbPassword);

const generateSalt = async (rounds?: number) => await bcrypt.genSalt(rounds);

const generateHashedPassword = async (password: string, salt: string) =>
  await bcrypt.hash(password, salt);

const generateAccessToken = async (payload: { id: string }) =>
  await jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });

const generateRefreshToken = async (payload: { id: string }) =>
  await jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: "1d",
  });

export {
  isPasswordValid,
  generateSalt,
  generateHashedPassword,
  generateAccessToken,
  generateRefreshToken,
};
