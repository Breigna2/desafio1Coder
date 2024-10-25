const fs = require('fs').promises;
const path = './data/products.json';

class ProductManager {
    static async getAllProducts() {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }

    static async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(p => p.id === id);
    }

    static async addProduct(product) {
        const products = await this.getAllProducts();
        const id = products.length ? products[products.length - 1].id + 1 : 1;
        const newProduct = { id, ...product };
        products.push(newProduct);
        await fs.writeFile(path, JSON.stringify(products));
        return newProduct;
    }

    static async updateProduct(id, updatedFields) {
        const products = await this.getAllProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Product not found');
        }

        // Actualizar solo los campos proporcionados en updatedFields
        products[index] = { ...products[index], ...updatedFields };

        // Guardar cambios en products.json
        await fs.writeFile(path, JSON.stringify(products));
        return products[index];
    }

    static async deleteProduct(id) {
        const products = await this.getAllProducts();
        const index = products.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Product not found');
        }

        // Remover el producto del array
        const deletedProduct = products.splice(index, 1);

        // Guardar cambios en products.json
        await fs.writeFile(path, JSON.stringify(products));
        return deletedProduct[0];
    }
}

module.exports = ProductManager;
