
import { Router } from "express";
import passport from "passport";
import { authorizeRoles } from "../middlewares/authMiddleware.js";
import { uploader } from "../utils/multerUtil.js";

import productDBManager from "../dao/productDBManager.js";
import { ProductRepository } from "../dao/repositories/productRepository.js";
import { ProductService } from "../services/productService.js";
import { ProductController } from "../controllers/productController.js";

const ProductDAO = new productDBManager();
const ProductRepo = new ProductRepository(ProductDAO);
const ProductServiceInstance = new ProductService(ProductRepo);
const ProductCtrl = new ProductController(ProductServiceInstance);

const router = Router();

router.get("/", ProductCtrl.getAllProducts);

router.get("/:pid", ProductCtrl.getProductById);

router.post(
    "/",
    passport.authenticate("current", { session: false }),
    authorizeRoles("admin"),
    uploader.single("thumbnail"),
    ProductCtrl.createProduct
);

router.put(
    "/:pid",
    passport.authenticate("current", { session: false }),
    authorizeRoles("admin"),
    uploader.array("thumbnails"),
    ProductCtrl.updateProduct
);

router.delete(
    "/:pid",
    passport.authenticate("current", { session: false }),
    authorizeRoles("admin"),
    ProductCtrl.deleteProduct
);

export default router;
