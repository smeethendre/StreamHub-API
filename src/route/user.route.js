import { Router } from "express";
import { registerUser } from "../controller/user.controller.js";

const router = Router();

router.post("/signup").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    }
  ]),
  registerUser
);

export { router };
