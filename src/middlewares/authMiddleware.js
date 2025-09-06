export const ensureAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).json({ status: "error", message: "No autenticado" });
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ status: "error", message: "No autenticado" });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ status: "error", message: "No autorizado" });
        }

        next();
    };
};