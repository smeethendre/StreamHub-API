// this middleware checks if the user has proper access token, and authorisation to hit  particular
// API endpoint

import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../util/apiError.js";
import asyncHandler from "../util/asyncHandler.js";

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Something went wrong");
    }

    const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedInfo) {
      throw new ApiError(401, "Something went wrog");
    }

    const user = await User.findById(decodedInfo?._id).select(
      "-password -refreshToken"
    );

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});

export { verifyToken };
