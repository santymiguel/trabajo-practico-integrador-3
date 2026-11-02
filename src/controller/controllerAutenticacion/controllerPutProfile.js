import { matchedData } from "express-validator";
import { UserModel } from "../../models/UserModel";
export const updateProfile = async (req, res) => {
  try {
    const data = matchedData(req, { locations: ["body"] });

    const user = await UserModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    user.profile = {
      ...user.profile,
      ...data,
    };

    await user.save();

    return res.status(200).json({
      ok: true,
      message: "Perfil actualizado correctamente",
      body: user.profile,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al actualizar el perfil",
    });
  }
};
