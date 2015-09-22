var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var mimeType = {

	"html": "text/html",
	"jpeg": "image/jpeg",
	"png": "image/png",
	"js": "text/javascript",
	"css":"text/css"
};

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, "127.0.0.1");

console.log('Server running at http://127.0.0.1:1337/');