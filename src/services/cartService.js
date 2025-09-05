
class CartService {
    constructor(cartRepository, productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    async getCart(cid) {
        return await this.cartRepository.getProductsFromCartByID(cid);
    }

    async createCart() {
        return await this.cartRepository.createCart();
    }

    async addProduct(cid, pid) {
        await this.productRepository.getProductByID(pid);
        return await this.cartRepository.addProductByID(cid, pid);
    }

    async removeProduct(cid, pid) {
        await this.productRepository.getProductByID(pid);
        return await this.cartRepository.deleteProductByID(cid, pid);
    }

    async updateProducts(cid, products) {
        for (let item of products) {
            await this.productRepository.getProductByID(item.product);
        }
        return await this.cartRepository.updateAllProducts(cid, products);
    }

    async updateProductQuantity(cid, pid, quantity) {
        if (!quantity || isNaN(parseInt(quantity))) {
            throw new Error("La cantidad ingresada no es válida!");
        }
        await this.productRepository.getProductByID(pid);
        return await this.cartRepository.updateProductByID(cid, pid, quantity);
    }

    async clearCart(cid) {
        return await this.cartRepository.deleteAllProducts(cid);
    }
}

export { CartService };
