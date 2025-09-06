import productModel from "./models/productModel.js";

class productDBManager {
    async getAllProducts(params) {
        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 10,
        };

        if (params.sort && (params.sort === "asc" || params.sort === "desc")) {
            paginate.sort = { price: params.sort };
        }

        return await productModel.paginate({}, paginate);
    }

    async getProductByID(pid) {
        return await productModel.findOne({ _id: pid });
    }

    async createProduct(product) {
        return await productModel.create(product);
    }

    async updateProduct(pid, productUpdate) {
        return await productModel.updateOne({ _id: pid }, productUpdate);
    }

    async deleteProduct(pid) {
        return await productModel.deleteOne({ _id: pid });
    }
}

export default productDBManager;
