var timeout = require('connect-timeout');
var express = require('express');
var app = express();

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