import UserService from "../services/userService.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../services/emailService.js";

const JWT_SECRET = process.env.JWT_SECRET || "changeme_jwt_secret";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "1h";

class UserController {
    generateToken(user) {
        const payload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };
        return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
    }

    register = async (req, res) => {
        try {
            const user = await UserService.register(req.body);
            res.status(201).json({
                status: "success",
                message: "Usuario registrado",
                user: {
                    first_name: user.first_name,
                    email: user.email,
                    role: user.role,
                },
            });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await UserService.login(email, password);
            const token = this.generateToken(user);

            res.json({
                status: "success",
                token,
                user: {
                    id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    age: user.age,
                    role: user.role,
                },
            });
        } catch (error) {
            res.status(401).json({ status: "error", message: error.message });
        }
    };

    current = async (req, res) => {
        try {
            const user = await UserService.getCurrentUser(req.user._id);
            const safeUser = {
                id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                age: user.age,
                role: user.role,
            };
            res.json({ status: "success", user: safeUser });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    // Recuperación de contraseña

    forgotPassword = async (req, res) => {
        try {
            const { email } = req.body;
            const { token, user } = await UserService.generateResetToken(email);

            const resetLink = `${process.env.FRONT_URL}/reset-password?token=${token}`;

            await sendMail(
                user.email,
                "Restablecer Contraseña",
                `<p>Haz clic en el botón para restablecer tu contraseña:</p>
                 <a href="${resetLink}" style="padding:10px 20px;background:#007bff;color:#fff;text-decoration:none;">Restablecer Contraseña</a>
                 <p>Este enlace expirará en 1 hora.</p>`
            );

            res.json({ status: "success", message: "Correo de recuperación enviado" });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    resetPassword = async (req, res) => {
        try {
            const { token, password } = req.body;
            await UserService.resetPassword(token, password);
            res.json({ status: "success", message: "Contraseña restablecida correctamente" });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };
}

export default new UserController();
