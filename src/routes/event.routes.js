import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validationPostEvent } from "../middlewares/validaciones/events.validation.js";
import { validate } from "../middlewares/validaciones/validate.js";
import { postEvent } from "../controller/events.controller.js";

export const eventRouter = Router();

eventRouter.post(
  "/events",
  authMiddleware,
  validationPostEvent,
  validate,
  postEvent,
);
