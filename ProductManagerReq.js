const ProductManager = require('../managers/ProductManager');

exports.getAllProducts = async (req, res) => {
    const products = await ProductManager.getAllProducts();
    res.json(products);
};

exports.getProductById = async (req, res) => {
    const product = await ProductManager.getProductById(req.params.pid);
    product ? res.json(product) : res.status(404).json({ message: 'Product not found' });
};

exports.addProduct = async (req, res) => {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;
    const newProduct = await ProductManager.addProduct({ title, description, code, price, status, stock, category, thumbnails });
    res.status(201).json(newProduct);
};

// Actualizar un producto por ID
exports.updateProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        const updatedFields = req.body;
        
        const updatedProduct = await ProductManager.updateProduct(Number(productId), updatedFields);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// Eliminar un producto por ID
exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.pid;
        
        const deletedProduct = await ProductManager.deleteProduct(Number(productId));
        res.json({ message: 'Product deleted', product: deletedProduct });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
