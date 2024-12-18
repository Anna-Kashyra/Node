import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);

router.get("/:userId", userController.getUserById);

router.delete("/:userId", userController.deleteUser);

router.put("/:userId", userController.updateUser);

router.patch("/:userId", userController.partialUpdateUser);

export const userRouter = router;
