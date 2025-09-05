
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
}

export { CartController };
