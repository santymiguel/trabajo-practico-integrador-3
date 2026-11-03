import { matchedData } from "express-validator";
import { EventModel } from "../models/EventModel.js";
import { CategoryModel } from "../models/CategoryModel.js";

export const postEvent = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const { categories = [], ...eventData } = data;

    // Verificar que las categorías existan
    const uniqueCategories = [
      ...new Map(categories.map((id) => [id.toString(), id])).values(),
    ];
    if (uniqueCategories.length > 0) {
      const categoriesCount = await CategoryModel.countDocuments({
        _id: { $in: uniqueCategories },
      });

      if (categoriesCount !== uniqueCategories.length) {
        return res.status(400).json({
          ok: false,
          message: "Una o más categorías no existen",
        });
      }
    }

    // Crear el evento
    const event = await EventModel.create({
      ...eventData,
      organizer: req.user.id,
      categories: uniqueCategories,
    });

    await event.populate("categories");

    return res.status(201).json({
      ok: true,
      message: "Evento creado correctamente",
      body: event,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al crear el evento",
    });
  }
};
