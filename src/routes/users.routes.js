import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";
import {
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controller/Users.controller.js";
import {
  validationDeleteUser,
  validationGetUser,
  validationUpdateUser,
} from "../middlewares/validaciones/usersValidaciones.js";
import { validate } from "../middlewares/validaciones/validate.js";

export const usersRouter = Router();

usersRouter.get("/", authMiddleware, adminMiddleware, getUsers);
usersRouter.get(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validationGetUser,
  validate,
  getUserById,
);
usersRouter.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validationUpdateUser,
  validate,
  updateUser,
);
usersRouter.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validationDeleteUser,
  validate,
  deleteUser,
);
