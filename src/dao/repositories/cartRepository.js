
class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getAllCarts() {
        return this.dao.getAllCarts();
    }

    getProductsFromCartByID(cid) {
        return this.dao.getProductsFromCartByID(cid);
    }

    createCart() {
        return this.dao.createCart();
    }

    addProductByID(cid, pid) {
        return this.dao.addProductByID(cid, pid);
    }

    deleteProductByID(cid, pid) {
        return this.dao.deleteProductByID(cid, pid);
    }

    updateAllProducts(cid, products) {
        return this.dao.updateAllProducts(cid, products);
    }

    updateProductByID(cid, pid, quantity) {
        return this.dao.updateProductByID(cid, pid, quantity);
    }

    deleteAllProducts(cid) {
        return this.dao.deleteAllProducts(cid);
    }
}

export { CartRepository };
