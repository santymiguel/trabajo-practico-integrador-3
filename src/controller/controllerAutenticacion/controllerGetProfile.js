import { UserModel } from "../../models/UserModel";

export const getProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "Usuario no encontrado",
      });
    }

    const perfil = user.profile;
    res.status(200).json({ body: perfil });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      message: "Error al obtener perfil",
      error: err.message,
    });
  }
};
