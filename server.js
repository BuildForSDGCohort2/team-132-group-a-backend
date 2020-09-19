var express        = require('express'),
    app            = express(),
    server         = require('http').createServer(app),
    bcrypt         = require('bcrypt-nodejs');
var ejs            = require('ejs');
var path           = require('path');
var flash          = require('connect-flash');
var morgan         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var session        = require('express-session');
var cookieParser   = require('cookie-parser');
var formidable     = require('formidable'),
    util           = require('util'),
    url            = require('url'),
    fs             = require('fs-extra');
var mysql          = require('mysql');
var io             = require('socket.io').listen(server,{'pingInterval': 30000, 'pingTimeout': 37000});
var appFiles       = require('./app');
var multer 		   = require('multer');
var PORT = process.env.Port || 2212;
//Chargement du site
app.set('views', __dirname + '/public/views');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser());                      // pull information from html in POST
app.use(methodOverride());                  // simulate DELETE and PUT
app.use(cookieParser());
app.use(session({ secret: 'letwork-workspace_app', cookie: { maxAge: 10000000 }}));
app.use(flash());
app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(multer({ dest: './tmp/'}));

server.listen(process.env.PORT || 2212);
appFiles.FileUtils.logger('Hello, I\'m listening on 2212 port so, letwork !');
var config = {
    socketIns:io,
    src:appFiles,
    app:app,
    formidable:formidable,
    fs:fs,
    path:path,
    bcrypt:bcrypt,
    multer:multer
};
new appFiles.MainController(config).run(mysql);