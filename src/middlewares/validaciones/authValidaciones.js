import { body } from "express-validator";
import { UserModel } from "../../models/UserModel.js";

export const validationRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El username es obligatorio")
    .bail()
    .isLength({ min: 3, max: 20 })
    .withMessage("El username debe tener entre 3 y 20 caracteres")
    .bail()
    .isAlphanumeric()
    .withMessage("El username solo puede contener letras y números")
    .bail()
    .custom(async (username) => {
      const user = await UserModel.findOne({ username });
      if (user) {
        throw new Error("El username ya está registrado");
      }
      return true;
    }),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .bail()
    .isEmail()
    .withMessage("El email no tiene un formato válido")
    .bail()
    .custom(async (email) => {
      const user = await UserModel.findOne({ email });
      if (user) {
        throw new Error("El email ya está registrado");
      }
      return true;
    }),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .bail()
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .bail()
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una mayúscula")
    .bail()
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una minúscula")
    .bail()
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número"),

  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida")
    .bail()
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    }),

  body("profile.phone")
    .optional()
    .matches(/^[0-9]{8,15}$/)
    .withMessage("El teléfono debe contener entre 8 y 15 dígitos"),
];

export const validationLogin = [
  body("username").trim().notEmpty().withMessage("El username es obligatorio"),

  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const validationPutProfile = [
  body("profile.firstName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/)
    .withMessage("El nombre solo puede contener letras"),

  body("profile.lastName")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .bail()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]+$/)
    .withMessage("El apellido solo puede contener letras"),

  body("profile.birthDate")
    .optional()
    .isISO8601()
    .withMessage("La fecha de nacimiento no es válida")
    .bail()
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser futura");
      }
      return true;
    }),

  body("profile.phone")
    .optional()
    .matches(/^[0-9]{8,15}$/)
    .withMessage("El teléfono debe contener entre 8 y 15 dígitos"),
];
