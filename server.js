const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Главная
  if (urlPath === '/') {
    urlPath = '/index.html';
  }
  // Блог: /blog -> /blog/index.html
  else if (urlPath === '/blog' || urlPath === '/blog/') {
    urlPath = '/blog/index.html';
  }
  // Статьи блога: /blog/rpp -> /blog/rpp.html и т.п.
  else if (urlPath.startsWith('/blog/') && !path.extname(urlPath)) {
    urlPath = urlPath + '.html';
  }
  // Остальные страницы в корне: /supervision -> /supervision.html и т.п.
  else if (!path.extname(urlPath)) {
    urlPath = urlPath + '.html';
  }

  const filePath = path.join(__dirname, urlPath);

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
    '.ico': 'image/x-icon',
    '.json': 'application/json; charset=utf-8'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
