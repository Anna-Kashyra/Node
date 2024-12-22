import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.validateBody(UserValidator.update),
  userController.updateMe,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);

export const userRouter = router;
