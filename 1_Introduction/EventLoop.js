var http = require('http');
var server = new http.Server();

server.on('request', function(req) {
    req.status(200);
    req.send();
});

server.listen(3000);