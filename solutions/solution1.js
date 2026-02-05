const http = require("http");
const readline = require("readline");

const { createServer } = require('node:http');

const hostname = '127.0.0.1';
const port = process.argv[2] || 3000;

const server = createServer((req, res) => {
    const metgod = req.method
    const path = req.url

    if (metgod === "GET" && path === "/") {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Welcome to Manual HTTP Router');
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
    }
});

server.listen(port, hostname, () => {
});



