import asyncHandler from "../util/asyncHandler.js";
import { ApiError } from "../util/apiError.js";
import { User } from "../model/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    throw ApiError(400, "Enter username and password");
  }

  const newUser = await User.create({
    userName,
    password,
  });

  res.status(200).json({
    success: true,
    message: "User Registered",

    user: {
      username: newUser.userName,
    },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { password, email, userName } = req.body;

  if ((!email && !userName) || !password) {
    throw new ApiError(400, "Invalid credentials");
  }

  let user;

  if (email) {
    user = await User.findOne({ email });
  } else {
    user = await User.findOne({ userName });
  }

  if (!user) {
    throw new ApiError(400, "User doesn't exit");
  }

  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    throw new ApiError(401, "Invalid credentials");
  }

  // now we have to generate the access and refresh token

  const generateAccessAndRefreshToken = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  };
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
});

import {verifyToken} from "../middleware/auth.middleware.js";

const logoutUser = async (user) => {}
  

export { registerUser, loginUser };
