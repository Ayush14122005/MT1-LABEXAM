import http from 'http';

const server = http.createServer((req, res) => {

    if (req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        res.end('<h1>Welcome to Employee Task Management</h1>');

    }

    else if (req.url === '/about') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Employee Task Management Application');

    }

    else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 Page Not Found');

    }

});

server.listen(3000, () => {
    console.log('HTTP Server running at http://localhost:3000');
});