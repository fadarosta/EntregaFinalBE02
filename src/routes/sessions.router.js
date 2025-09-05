import { Router } from "express";
import passport from "passport";
import initializePassport from "../config/passport.config.js";
import UserController from "../controllers/userController.js";

initializePassport();
const router = Router();

// Registro
router.post("/register", (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user)
            return res.status(400).json({ status: "error", message: info?.message });
        return res.status(201).json({
            status: "success",
            message: "Usuario registrado",
            user: {
                first_name: user.first_name,
                email: user.email,
                role: user.role,
            },
        });
    })(req, res, next);
});

// Login
router.post("/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user)
            return res.status(401).json({ status: "error", message: info?.message });
        return UserController.login(req, res);
    })(req, res, next);
});

// Usuario actual
router.get(
    "/current",
    passport.authenticate("current", { session: false }),
    UserController.current
);


// Recuperación de contraseña
// Solicitar restablecimiento
router.post("/forgot-password", UserController.forgotPassword);

// Restablecer contraseña con token
router.post("/reset-password", UserController.resetPassword);

export default router;
