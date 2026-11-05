import { body } from "express-validator";
import { EventModel } from "../../models/EventModel.js";

export const validationPostEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .bail()
    .isLength({ min: 3, max: 150 })
    .withMessage("El título debe tener entre 3 y 150 caracteres")
    .bail()
    .custom(async (title) => {
      const titleExistente = await EventModel.findOne({ title: title });
      if (titleExistente) {
        throw new Error("El titulo ya esta en uso");
      }
    }),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .bail()
    .isLength({ min: 20 })
    .withMessage("La descripción debe tener al menos 20 caracteres"),

  body("startDate")
    .notEmpty()
    .withMessage("La fecha de inicio es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de inicio no es válida"),

  body("endDate")
    .notEmpty()
    .withMessage("La fecha de finalización es obligatoria")
    .bail()
    .isISO8601()
    .withMessage("La fecha de finalización no es válida"),

  body("capacity")
    .notEmpty()
    .withMessage("La capacidad es obligatoria")
    .bail()
    .isInt({ min: 1 })
    .withMessage("La capacidad debe ser un entero mayor o igual a 1"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser mayor o igual a 0"),

  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("El estado no es válido"),

  body("categories")
    .optional()
    .isMongoId()
    .withMessage(
      "Las ids ingresadas en categories deben ser ids validas de mongo",
    )
    .isArray()
    .withMessage("Las categorías deben ser un array"),

  body("location.venue")
    .trim()
    .notEmpty()
    .withMessage("El lugar es obligatorio")
    .bail()
    .isLength({ min: 3, max: 100 })
    .withMessage("El lugar debe tener entre 3 y 100 caracteres"),

  body("location.address")
    .trim()
    .notEmpty()
    .withMessage("La dirección es obligatoria")
    .bail()
    .isLength({ min: 5, max: 150 })
    .withMessage("La dirección debe tener entre 5 y 150 caracteres"),

  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("La ciudad es obligatoria")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("La ciudad debe tener entre 2 y 50 caracteres"),
];
