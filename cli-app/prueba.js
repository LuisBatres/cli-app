var express = require('express');

var app = express();

app.set('port', 79);
console.log('Express escucha en el puerto ' + app.get('port'));
app.set('variable', 'Hola Edmundo');
console.log(app.get('variable'));

app.set('aprendiendo', true);
app.enable('aprendiendo');
console.log('Estoy aprendiendo  ' + app.enabled('aprendiendo'));

//env
/*
development
test
stage
preview
production
*/
app.set('env', 'test');
process.env.NODE_ENV = 'test';
console.log(app.get('env'));
/**** view cache
***** view engine          ('ext', 'jade')
***** views
***** trust proxy             Varnish Nginx
***** jsonp callback name     res.jsonp()
                        callback=updateView
                        cb=updateView
                        app.set('jsonp callback name', 'cb')
http://en.wikipedia.org/wiki/Cross-origin_resource_sharing

****** case sensitive routing      app.enable('case sensitive routing')
****** strict routing               /users
                                    /users/

*/

app.get('/users', function (req, res) {
    res.send('users');
});
app.get('/users/', function (req, res) {
    res.send('users/');
});
/*********
 *      x-powered-by
 * 
 *      etag                (entity tag)
 */
app.set('etag', function (body, encoding) {
    return customEtag(body, encoding);
});
/*******
 * query parser
 */
app.set('query parser', 'simple');
app.set('query parser', false);
app.set('query parser', function(){});

/*** 
 * ENTORNOS
 * 
 */

process.env.NODE_ENV

if ('development' === process.env.NODE_ENV) {
    // Conectarse a la base de datos de desarrollo
} else if ('production' === process.env.NODE_ENV) {
    // Conectarse a la base de datos de producción
}

if ('development' === app.get('env')) {

} else if ('production' === app.get('env')) {

}

app.configure(function() {
    app.set('appName', 'App Demo FullStack1');
    app.set('emailAutor', 'jcarlos19@jcarlos19.com');
});

app.configure('development', function() {
    app.set('dbUri', 'mongodb://localhost:27017/db');
});
app.configure('production', function() {
    app.set('dbUri', process.env.MONGOHO_URL);
});

/*****
 * MIDDLEWARE
 */

var miMiddleware = function (req, res, next) {
    // Hacer algo con req y/o res
    next();
};


var compression = require('compression');

app.use(compression({level: 7, }));

/**
 * body-parser
 *      json()
 *      urlencoded()
 *      raw()
 *      text()
 * 
 *          req.body.object
 *          
 *          strict
 *          reviver
 *          limit
 *          inflate
 *          type
 *          verify
 * 
 */

var bodyParser = require('body-parser');

app.use(bodyParser.json({
    strict: false,
    reviver: function(key, value) {
        if (key.substr(0, 1) === '_') {
            return undefined;
        } else {
            return value;
        }
    },
    limit: 5000
}));

app.use(bodyParser.urlencoded({limit:10000}));

/**
 * cookie-parser
 * 
 * npm install cookie-parser@1.3.2
 * req.cookie.object
 * 
 * path
 * expires
 * maxAge
 * domain
 * secure
 * httpOnly
 * 
 * JSONCookie(string)
 * JSONCookies(cookies)
 * signedCookie(string, secret)
 * signedCookies(cookies, secret)
 */
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.use(cookieParser('esta cadena es un secreto'));

/**
 * express-session
 * 
 * key          connect.sid
 * store
 * secret
 * cookie           { path: '/', httpOnly: true, maxAge: null }
 * proxy
 * saveUninitialized
 * unset                keep, destroy
 * resave
 * rolling
 * genid
 * 
 * 
 * csurf
 * 
 * Cross-site request forgery (CSRF)
 *      value
 *      cookie
 *      ignoreMethods  ['GET', 'HEAD', 'OPTIONS']
 * 
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var csrf = require('csurf');
// ... Instantiate Express.js application
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session());
app.use(csrf());
 */

var csrf = require('csurf');

app.use(csrf());


/**
 * express.static()     serve-static
 * 
 */
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));
app.use(express.static('public'));

/**
 * connect-timeout
 */
var timeout = require('connect-timeout');

app.get(
    '/slow-request',
    timeout('1s'),
    function(request, response, next) {
        setTimeout(function() {
            if (request.timeout) return false;
            return next();
        }, 999 + Math.round(Math.random()));
    }, function(request, response, next) {
        response.send('ok');
    }
);