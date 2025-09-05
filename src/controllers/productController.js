import productService from "../services/productService.js";

class ProductController {
    async getAllProducts(req, res) {
        try {
            const products = await productService.getAllProducts(req.query);
            res.json({ status: "success", payload: products });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    async getProductById(req, res) {
        try {
            const product = await productService.getProductById(req.params.pid);
            res.json({ status: "success", payload: product });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async createProduct(req, res) {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map((file) => file.path);
            }
            const newProduct = await productService.createProduct(req.body);
            res.status(201).json({ status: "success", payload: newProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map((file) => file.filename);
            }
            const updatedProduct = await productService.updateProduct(req.params.pid, req.body);
            res.json({ status: "success", payload: updatedProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const result = await productService.deleteProduct(req.params.pid);
            res.json({ status: "success", payload: result });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    }
}

export default new ProductController();
