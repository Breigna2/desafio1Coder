const fs = require('fs').promises;
const path = './data/carts.json';

class CartManager {
    static async getAllCarts() {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    }

    static async getCartById(id) {
        const carts = await this.getAllCarts();
        return carts.find(c => c.id === id);
    }

    static async createCart() {
        const carts = await this.getAllCarts();
        const id = carts.length ? carts[carts.length - 1].id + 1 : 1;
        const newCart = { id, products: [] };
        carts.push(newCart);
        await fs.writeFile(path, JSON.stringify(carts));
        return newCart;
    }

    static async addProductToCart(cartId, productId) {
        const carts = await this.getAllCarts();
        const cart = carts.find(c => c.id === cartId);

        if (!cart) {
            throw new Error('Cart not found');
        }

        // Buscar el producto en el carrito
        const productInCart = cart.products.find(p => p.product === productId);

        if (productInCart) {
            // Incrementar la cantidad si el producto ya existe en el carrito
            productInCart.quantity += 1;
        } else {
            // Agregar el producto al carrito con cantidad inicial de 1
            cart.products.push({ product: productId, quantity: 1 });
        }

        // Guardar cambios en carts.json
        await fs.writeFile(path, JSON.stringify(carts));
        return cart;
    }

    static async updateCart(cartId, updatedFields) {
        const carts = await this.getAllCarts();
        const index = carts.findIndex(c => c.id === cartId);

        if (index === -1) {
            throw new Error('Cart not found');
        }

        // Actualizar solo los campos proporcionados en updatedFields
        carts[index] = { ...carts[index], ...updatedFields };

        // Guardar cambios en carts.json
        await fs.writeFile(path, JSON.stringify(carts));
        return carts[index];
    }

    static async deleteCart(cartId) {
        const carts = await this.getAllCarts();
        const index = carts.findIndex(c => c.id === cartId);

        if (index === -1) {
            throw new Error('Cart not found');
        }

        // Remover el carrito del array
        const deletedCart = carts.splice(index, 1);

        // Guardar cambios en carts.json
        await fs.writeFile(path, JSON.stringify(carts));
        return deletedCart[0];
    }
}

module.exports = CartManager;
