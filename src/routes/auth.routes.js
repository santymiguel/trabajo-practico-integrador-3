import { Router } from "express";
import { register } from "../controller/controllerAutenticacion/controllerPostRegister.js";
import { login } from "../controller/controllerAutenticacion/controllerPostLogin.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getProfile } from "../controller/controllerAutenticacion/controllerGetProfile.js";
import { updateProfile } from "../controller/controllerAutenticacion/controllerPutProfile.js";
import { logout } from "../controller/controllerAutenticacion/controllerPostLogout.js";
import {
  validationLogin,
  validationPutProfile,
  validationRegister,
} from "../middlewares/validaciones/authValidaciones.js";
import { validate } from "../middlewares/validaciones/validate.js";

export const authRouter = Router();

authRouter.post("/register", validationRegister, validate, register);
authRouter.post("/login", validationLogin, validate, login);
authRouter.get("/profile", authMiddleware, getProfile);
authRouter.put(
  "/profile",
  authMiddleware,
  validationPutProfile,
  validate,
  updateProfile,
);
authRouter.post("/logout", authMiddleware, logout);
