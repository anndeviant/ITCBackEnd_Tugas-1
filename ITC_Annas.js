const http = require('http');
const url = require('url');
const {
    users
} = require('./datauser.js');

const server = http.createServer((req, res) => {
    try {
        if (req.method === 'GET') {
            const parsedUrl = url.parse(req.url, true);
            const pathname = parsedUrl.pathname;
            if (pathname === '/') {
                res.setHeader('Content-Type', 'html');
                res.writeHead(200);
                res.end('<h1>halo dunia!<h1>\n')
            } else if (pathname === '/users') {
                try {
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(200);
                    res.end(JSON.stringify(users));
                } catch (err) {
                    const errorResponse = {
                        Status: "Internal Server Error!",
                        Message: "Terjadi kesalahan dalam pengambilan data user."
                    };
                    res.setHeader('Content-Type', 'application/json');
                    res.writeHead(404);
                    res.end(JSON.stringify(errorResponse));
                }
            } else {
                const err = {
                    Status: "404, Not Found!",
                    Message: "Resource Not Found!"
                }
                res.setHeader('Content-Type', 'application/json');
                res.writeHead(404);
                res.end(JSON.stringify(err));
            }
        } else {
            const notGet = {
                Status: "Method Permission Denied!",
                Message: "Metode HTTP tidak diizinkan!"
            }
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(404);
            res.end(JSON.stringify(notGet));
        }
    } catch (err) {
        const errorResponse = {
            Status: "Internal Server Error",
            Message: "Terjadi kesalahan dalam Permintaan Handler"
        };
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(404);
        res.end(JSON.stringify(errorResponse));
    }
})

const port = 3000;

server.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});