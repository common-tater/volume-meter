var http = require('http');
var ecstatic = require('ecstatic');
var server, statics = ecstatic(__dirname, { cache: false });

var server = http.createServer(function (req, res) {
  console.log(req.method + ' ' + req.url);

  statics(req, res, function() {
    req.url = '/';
    req.statusCode = 200;
    statics(req, res);
  });
});

server.listen(process.env.PORT || 8080, process.env.HOST || '::', function (err) {
  if (err) return console.error('failed to start http server:', err);
  console.log('server listening on ' + (process.env.PORT || 8080));
});
