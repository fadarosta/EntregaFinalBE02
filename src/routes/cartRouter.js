
import { Router } from "express";
import { productDBManager } from "../dao/productDBManager.js";
import { cartDBManager } from "../dao/cartDBManager.js";
import { CartRepository } from "../dao/repositories/cartRepository.js";
import { CartService } from "../services/cartService.js";
import { CartController } from "../controllers/cartController.js";

const ProductDAO = new productDBManager();
const CartDAO = new cartDBManager(ProductDAO);
const CartRepo = new CartRepository(CartDAO);
const CartServiceInstance = new CartService(CartRepo, ProductDAO); 
const CartCtrl = new CartController(CartServiceInstance);

const router = Router();

router.get("/:cid", CartCtrl.getCart);
router.post("/", CartCtrl.createCart);
router.post("/:cid/product/:pid", CartCtrl.addProduct);
router.delete("/:cid/product/:pid", CartCtrl.removeProduct);
router.put("/:cid", CartCtrl.updateProducts);
router.put("/:cid/product/:pid", CartCtrl.updateProductQuantity);
router.delete("/:cid", CartCtrl.clearCart);

export default router;
