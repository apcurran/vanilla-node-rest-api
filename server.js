"use strict";

const http = require("http");
const PORT = process.env.PORT || 5000;
const products = require("./data/products.json");

const server = http.createServer((req, res) => {
    if (req.url === "/api/products" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route not found" }));
    }
});

server.listen(PORT, () => console.log(`Server listening on port, ${PORT}`));