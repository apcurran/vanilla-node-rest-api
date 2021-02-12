const Product = require("../models/product-model");
const { getPostData } = require("../utils/index");

// @desc GET all products
// @route /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));

    } catch (err) {
        console.error(err);
    }
}

// @desc GET one product
// @route /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }

    } catch (err) {
        console.error(err);
    }
}

// @desc POST one product
// @route /api/products
async function createProduct(req, res, id) {
    try {
        const body = await getPostData(req);
        const { title, description, price } = JSON.parse(body);
        const product = {
            title,
            description,
            price
        };
        const newProduct = await Product.create(product);

        res.writeHead(201, { "Content-Type": "application/json" });

        return res.end(JSON.stringify(newProduct));

    } catch (err) {
        console.error(err);
    }
}

// @desc PATCH one product
// @route /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        } else {
            const body = await getPostData(req);
            const { title, description, price } = JSON.parse(body);
            const productData = {
                title: title || product.title,
                description: description || product.description,
                price: price || product.price
            };
            const updatedProduct = await Product.update(id, productData);
    
            res.writeHead(200, { "Content-Type": "application/json" });
    
            return res.end(JSON.stringify(updatedProduct));
        }

    } catch (err) {
        console.error(err);
    }
}

// @desc DELETE one product
// @route /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id);

        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product not found" }));
        } else {
            await Product.remove(id);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `Product with id of ${id} removed.` }));
        }

    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};