
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

    async checkout(cid, purchaserEmail) {
        const cart = await this.cartRepository.getProductsFromCartByID(cid);
        if (!cart) throw new Error("Carrito no encontrado");

        const itemsPurchased = [];
        const itemsNotProcessed = [];

        for (let item of cart.products) {
            const product = await this.productRepository.getProductByID(item.product);
            if (!product) {
                itemsNotProcessed.push({
                    product: item.product,
                    reason: "Producto no encontrado",
                });
                continue;
            }

            if (product.stock >= item.quantity) {
                await this.productRepository.updateProduct(product._id, {
                    stock: product.stock - item.quantity,
                });

                itemsPurchased.push({
                    product: product._id,
                    quantity: item.quantity,
                });
            } else {
                itemsNotProcessed.push({
                    product: product._id,
                    reason: "Stock insuficiente",
                });
            }
        }

        if (itemsPurchased.length > 0) {
            await this.cartRepository.removeProducts(cid, itemsPurchased.map(i => i.product));
        }

        const ticket = {
            purchaser: purchaserEmail,
            itemsPurchased,
            itemsNotProcessed,
            purchase_datetime: new Date(),
        };

        return ticket;
    }
}

export { CartService };
