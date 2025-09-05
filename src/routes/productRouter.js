import { Router } from "express";
import productController from "../controllers/productController.js";
import { uploader } from "../utils/multerUtil.js";

const router = Router();

router.get("/", productController.getAllProducts);
router.get("/:pid", productController.getProductById);
router.post("/", uploader.array("thumbnails", 3), productController.createProduct);
router.put("/:pid", uploader.array("thumbnails", 3), productController.updateProduct);
router.delete("/:pid", productController.deleteProduct);

export default router;
