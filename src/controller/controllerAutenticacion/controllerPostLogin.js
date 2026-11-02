import { matchedData } from "express-validator";
import { comparePassword } from "../../helpers/bcrypt.helper.js";
import { generateToken } from "../../helpers/jwt.helper.js";
import { UserModel } from "../../models/UserModel.js";

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });
    // 1. Buscar usuario en la base de datos
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // 2. Comparar contraseña ingresada con hash almacenado
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    // 3. Si la contraseña es correcta, generar JWT
    const token = generateToken({
      id: user.id,
      role: user.role,
    });
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });
    return res.json({ message: "Login exitoso" });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer iniciar sesion",
      error: err.message,
    });
  }
};
