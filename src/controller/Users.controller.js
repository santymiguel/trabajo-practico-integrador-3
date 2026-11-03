import { hashPassword } from "../helpers/bcrypt.helper.js";
import { UserModel } from "../models/UserModel.js";
import { matchedData } from "express-validator";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ deletedAt: null })
      .select("-password")
      .populate("events");

    return res.status(200).json({
      ok: true,
      message: "Usuarios obtenidos correctamente",
      body: users,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al obtener los usuarios",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    })
      .select("-password")
      .populate("events");
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }
    return res.status(200).json({
      ok: true,
      message: "Usuario obtenido correctamente",
      body: user,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al obtener el usuario",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { password, profile, ...userData } = matchedData(req, {
      locations: ["body"],
    });

    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    Object.assign(user, userData);

    if (profile) {
      user.profile = {
        ...user.profile,
        ...profile,
      };
    }

    if (password) {
      user.password = await hashPassword(password);
    }
    await user.save();

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(200).json({
      ok: true,
      message: "Usuario actualizado correctamente",
      body: userResponse,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el usuario",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findOne({
      _id: id,
      deletedAt: null,
    });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    await EventModel.deleteMany({
      organizer: user._id,
    });

    user.deletedAt = new Date();

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Usuario y sus eventos eliminados correctamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al eliminar el usuario",
    });
  }
};
