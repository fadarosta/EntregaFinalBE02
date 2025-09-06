class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll(params) {
        return await this.dao.getAllProducts(params);
    }

    async getById(pid) {
        return await this.dao.getProductByID(pid);
    }

    async create(product) {
        return await this.dao.createProduct(product);
    }

    async update(pid, productUpdate) {
        return await this.dao.updateProduct(pid, productUpdate);
    }

    async delete(pid) {
        return await this.dao.deleteProduct(pid);
    }
}

export { ProductRepository };
