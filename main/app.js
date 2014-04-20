var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var server = require('http').createServer(app);
var path = require('path');
var io = require('socket.io').listen(server);
var spawn = require('child_process').spawn;
var omx = require('omxcontrol');

var routes = require('./routes/index');
var users = require('./routes/users');
var app = express();

//Environment Setup
io.set('log level', 1);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.TEST_PORT || 8080);
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', routes);
app.use(omx());

//Routes for handling request

app.get('/', function (req, res) { res.sendfile(__dirname + '/public/index.html'); });

app.get('/remote', function (req, res) { res.sendfile(__dirname + '/public/remote.html'); });

server.listen(app.get('port'), function(){ console.log('Express server listening on port ' + app.get('port')); });

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
