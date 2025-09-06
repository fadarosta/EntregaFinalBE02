class ProductController {
    constructor(productService) {
        this.productService = productService;
    }

    getAllProducts = async (req, res) => {
        try {
            const products = await this.productService.getAllProducts(req.query);
            res.json({ status: "success", payload: products });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    };

    getProductById = async (req, res) => {
        try {
            const product = await this.productService.getProductById(req.params.pid);
            res.json({ status: "success", payload: product });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    createProduct = async (req, res) => {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map(file => file.path);
            }
            const newProduct = await this.productService.createProduct(req.body);
            res.status(201).json({ status: "success", payload: newProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    updateProduct = async (req, res) => {
        try {
            if (req.files) {
                req.body.thumbnails = req.files.map(file => file.path);
            }
            const updatedProduct = await this.productService.updateProduct(req.params.pid, req.body);
            res.json({ status: "success", payload: updatedProduct });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };

    deleteProduct = async (req, res) => {
        try {
            const result = await this.productService.deleteProduct(req.params.pid);
            res.json({ status: "success", payload: result });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message });
        }
    };
}

export { ProductController };