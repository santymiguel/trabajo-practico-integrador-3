import { matchedData } from "express-validator";
import { hashPassword } from "../../helpers/bcrypt.helper.js";
import { UserModel } from "../../models/UserModel.js";

export async function register(req, res) {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const { password, ...UserData } = data;

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      ...UserData,
      password: hashedPassword,
    });

    const userResponse = user.toJSON();
    delete userResponse.password;

    return res.status(201).json({
      ok: true,
      status: 201,
      body: userResponse,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      status: 500,
      message: "error al querer crear el usuario",
      error: err.message,
    });
  }
}
