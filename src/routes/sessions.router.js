import { Router } from "express";
import passport from "passport";
import initializePassport from "../config/passport.config.js";
import UserController from "../controllers/userController.js";
import userModel from "../dao/models/userModel.js";

initializePassport();
const router = Router();

// Registro User
router.post("/register", (req, res, next) => {
    passport.authenticate("register", { session: false }, (err, user, info) => {
        if (err) return next(err);
        if (!user)
            return res.status(400).json({ status: "error", message: info?.message });

        return res.status(201).json({
            status: "success",
            message: "Usuario registrado correctamente",
            user: {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                role: user.role,
            },
        });
    })(req, res, next);
});

// Registro admin
router.post("/registerAdmin", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Verificación
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res
                .status(400)
                .json({ status: "error", message: "El email ya está registrado" });
        }

        // Creacion del admin
        const newAdmin = new userModel({
            first_name,
            last_name,
            email,
            password,
            role: "admin",
        });

        await newAdmin.save();

        return res.status(201).json({
            status: "success",
            message: "Administrador registrado correctamente",
            user: {
                id: newAdmin._id,
                first_name: newAdmin.first_name,
                email: newAdmin.email,
                role: newAdmin.role,
            },
        });
    } catch (error) {
        console.error("Error al registrar admin:", error);
        return res
            .status(500)
            .json({ status: "error", message: "Error al registrar admin" });
    }
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
router.post("/forgotPassword", UserController.forgotPassword);
router.post("/resetPassword", UserController.resetPassword);

export default router;
