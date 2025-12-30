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

export { registerUser };

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

  
});

export { loginUser };
