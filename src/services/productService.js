class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts(params) {
        const products = await this.productRepository.getAll(params);

        const paginate = {
            page: params.page ? parseInt(params.page) : 1,
            limit: params.limit ? parseInt(params.limit) : 10,
        };

        products.prevLink = products.hasPrevPage
            ? `http://localhost:8080/products?page=${products.prevPage}`
            : null;

        products.nextLink = products.hasNextPage
            ? `http://localhost:8080/products?page=${products.nextPage}`
            : null;

        if (products.prevLink && paginate.limit !== 10) {
            products.prevLink += `&limit=${paginate.limit}`;
        }
        if (products.nextLink && paginate.limit !== 10) {
            products.nextLink += `&limit=${paginate.limit}`;
        }

        if (products.prevLink && params.sort) {
            products.prevLink += `&sort=${params.sort}`;
        }
        if (products.nextLink && params.sort) {
            products.nextLink += `&sort=${params.sort}`;
        }

        return products;
    }

    async getProductById(pid) {
        return await this.productRepository.getById(pid);
    }

    async createProduct(product) {
        const { title, description, code, price, stock, category } = product;

        if (!title || !description || !code || !price || !stock || !category) {
            throw new Error("Error al crear el producto");
        }

        return await this.productRepository.create(product);
    }

    async updateProduct(pid, productUpdate) {
        return await this.productRepository.update(pid, productUpdate);
    }

    async deleteProduct(pid) {
        return await this.productRepository.delete(pid);
    }
}

export { ProductService };