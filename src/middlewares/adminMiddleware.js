export const adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      ok: false,
      message: "Acceso denegado. Se requiere rol de administrador",
    });
  }

  next();
};
