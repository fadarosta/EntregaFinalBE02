// src/middlewares/authMiddleware.js

export const ensureAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).json({
        status: "error",
        message: "No autenticado: se requiere un token válido",
    });
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                status: "error",
                message: "No autenticado: se requiere un token válido",
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "error",
                message: `No autorizado: se requiere rol ${roles.join(" o ")}`,
            });
        }

        next();
    };
};
