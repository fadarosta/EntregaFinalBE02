import { Router } from "express";
import MockProductService from "../services/mockProductService.js";

const router = Router();

// GET /api/mock-products
router.get("/", (req, res) => {
  const products = MockProductService.getAll();
  res.json({ status: "success", products });
});

// GET /api/mock-products/:pid
router.get("/:pid", (req, res) => {
  try {
    const product = MockProductService.getById(req.params.pid);
    res.json({ status: "success", product });
  } catch (error) {
    res.status(404).json({ status: "error", message: error.message });
  }
});

export default router;
