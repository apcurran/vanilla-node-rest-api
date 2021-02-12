const { nanoid } = require("nanoid");

const products = require("../data/products.json");
const { writeDataToFile } = require("../utils/index");

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((prod) => prod.id === id);

        resolve(product);
    });
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = { id: nanoid(), ...product };
        products.push(newProduct);

        writeDataToFile("./data/products.json", products);

        resolve(newProduct);
    });
}

module.exports = {
    findAll,
    findById,
    create,
};