const http = require('http');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'notes.txt');

const server = http.createServer((req, res) => {

    const urlObj = new URL(req.url, `http://${req.headers.host}`);
    const pathname = urlObj.pathname;
    const note = urlObj.searchParams.get("note");

    if (pathname === "/add" && req.method === "GET") {

        if (!note) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("400 Bad Request - Note is missing");
            return;
        }

        fs.appendFile(filePath, note + "\n", (err) => {
            if (err) {
                res.writeHead(500);
                res.end("Error saving note");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Note Added Successfully");
        });
    }

    else if (pathname === "/notes" && req.method === "GET") {

        fs.readFile(filePath, "utf8", (err, data) => {

            if (err || data.trim() === "") {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("No Notes Found");
                return;
            }

            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(data);
        });
    }

    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
