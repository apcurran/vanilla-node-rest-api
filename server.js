"use strict";

const http = require("http");
const PORT = process.env.PORT || 5000;
const { getProducts, getProduct, createProduct } = require("./controllers/product-controller");

const server = http.createServer((req, res) => {
    if (req.url === "/api/products" && req.method === "GET") {
        getProducts(req, res);
    } else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const id = req.url.split("/")[3];

        getProduct(req, res, id);
    } else if (req.url === "/api/products" && req.method === "POST") {
        createProduct(req, res);
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => console.log(`Server listening on port, ${PORT}`));