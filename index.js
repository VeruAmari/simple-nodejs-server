const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const filePath = path.join(
    __dirname,
    req.url === "/" ? "index.html" : req.url
  );
  const extname = path.extname(filePath);
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.write(content);
          res.end();
        });
      }
    } else {
      res.write(content);
      res.end();
    }
  });
});
const PORT = process.env.PORT || 8080;

server.listen(PORT);
