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

module.exports = {
    getProducts,
    getProduct,
    createProduct,
};