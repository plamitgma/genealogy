var express = require('express');
var app = express();
app.use(express.static('./'));
var port = process.env.PORT || 3000;
app.set('port', port);

//serve index.html for all not 'static' prefixed requests
app.all('/*', function(req, res) {
  res.sendfile('index.html', {root: './'});
});
 
var server = app.listen(app.get('port'), function (req, res) {
    if (res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
    }
    console.log('Express server listening on port ' + server.address().port);
});
