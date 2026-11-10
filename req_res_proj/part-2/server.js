const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    if (req.url === '/home') {
        res.end(`<h1>Welcome Home</h1>`);
    }

    else if (req.url === '/about') {
        res.end(`<h1>Welcome to About Page</h1>`);
    }

    else if (req.url === '/node') {
        res.end(`<h1>Welcome to my Nodejs Project</h1>`);
    }
    else {
        res.statusCode = 404;
        res.end(`<h1>Page Not Found</h1>`);
    }
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running on http://0.0.0.0:3000');
});