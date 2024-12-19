import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.getList);
router.post(
  "/",
  commonMiddleware.validateBody(UserValidator.create),
  userController.create,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getUserById,
);

router.delete(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.deleteUser,
);

router.put(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  commonMiddleware.validateBody(UserValidator.update),
  userController.updateUser,
);

export const userRouter = router;
