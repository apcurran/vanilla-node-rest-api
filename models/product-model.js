const { nanoid } = require("nanoid");

let products = require("../data/products.json");
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

function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((prod) => prod.id === id);
        products[index] = { id, ...product };

        writeDataToFile("./data/products.json", products);

        resolve(products[index]);
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        products = products.filter((prod) => prod.id !== id);

        writeDataToFile("./data/products.json", products);

        resolve();
    });
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
};