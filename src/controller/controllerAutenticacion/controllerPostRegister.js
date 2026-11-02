import { matchedData } from "express-validator";
import { hashPassword } from "../../helpers/bcrypt.helper";
import { UserModel } from "../../models/UserModel";

export async function register(req, res) {
  try {
    const data = matchedData(req, { locations: ["body"] });
    const { password, ...profileData } = data;

    const hashedPassword = await hashPassword(password);

    const user = await UserModel.create({
      ...profileData,
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
