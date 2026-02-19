const http = require('http');
const fs = require('fs');
const path = require('path');


const server = http.createServer((req, res) => {

    const logFilePath = path.join(__dirname, 'requests.log');

    const dateTime = new Date().toISOString();

    const logMessage = `${dateTime} | ${req.method} | ${req.url}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Error writing log');
        }
    });

    if (req.url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to Home Page');
    }
    else if (req.url === '/about' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is About Page');
    }
    else if (req.url === '/contact' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('This is Contact Page');
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
