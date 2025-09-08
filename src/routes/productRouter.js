// src/routes/productRouter.js
import { Router } from "express";
import passport from "passport";
import { ensureAuthenticated, authorizeRoles } from "../middlewares/authMiddleware.js";
import productModel from "../dao/models/productModel.js";

const router = Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const products = await productModel.find();
        res.json({ status: "success", products });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});

// GET product by ID
router.get("/:pid", async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (!product) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado" });
        }
        res.json({ status: "success", product });
    } catch (error) {
        res.status(400).json({ status: "error", message: error.message });
    }
});

// POST product (solo admin)
router.post(
    "/",
    passport.authenticate("current", { session: false }),
    authorizeRoles("admin"), // 🚀 tu middleware ya lo hace
    async (req, res) => {
        try {
            const product = await productModel.create(req.body);
            res.status(201).json({ status: "success", product });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
);

export default router;
