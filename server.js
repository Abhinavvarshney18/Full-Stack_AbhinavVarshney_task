const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const filePath = path.join(__dirname, 'notes.txt');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname;
    const query = parsedUrl.query;

    if (route === '/add' && req.method === 'GET') {

        if (!query.note) {
            res.writeHead(400, { 'Content-Type': 'text/plain' });
            res.end('400 Bad Request - Note is missing');
            return;
        }

        fs.appendFile(filePath, query.note + '\n', (err) => {
            if (err) {
                res.writeHead(500);
                res.end('Error saving note');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Note Added Successfully');
        });
    }

    else if (route === '/notes' && req.method === 'GET') {

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err || data.trim() === '') {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No Notes Found');
                return;
            }

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }

});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
