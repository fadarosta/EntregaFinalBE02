
class CartController {
    constructor(cartService) {
        this.cartService = cartService;
    }

    getCart = async (req, res) => {
        try {
            const result = await this.cartService.getCart(req.params.cid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    createCart = async (req, res) => {
        try {
            const result = await this.cartService.createCart();
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    addProduct = async (req, res) => {
        try {
            const result = await this.cartService.addProduct(req.params.cid, req.params.pid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    removeProduct = async (req, res) => {
        try {
            const result = await this.cartService.removeProduct(req.params.cid, req.params.pid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    updateProducts = async (req, res) => {
        try {
            const result = await this.cartService.updateProducts(req.params.cid, req.body.products);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    updateProductQuantity = async (req, res) => {
        try {
            const result = await this.cartService.updateProductQuantity(
                req.params.cid,
                req.params.pid,
                req.body.quantity
            );
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    clearCart = async (req, res) => {
        try {
            const result = await this.cartService.clearCart(req.params.cid);
            res.send({ status: "success", payload: result });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };

    checkout = async (req, res) => {
        try {
            const { cid } = req.params;
            const purchaserEmail = req.user?.email || req.body.email; 
            if (!purchaserEmail) {
                return res.status(400).send({ status: "error", message: "Email del comprador requerido" });
            }

            const ticket = await this.cartService.checkout(cid, purchaserEmail);
            res.send({ status: "success", payload: ticket });
        } catch (error) {
            res.status(400).send({ status: "error", message: error.message });
        }
    };
}

export { CartController };
