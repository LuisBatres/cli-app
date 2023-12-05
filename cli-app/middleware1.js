var express = require('express');
var app = express();


console.log(app.get('env'));
app.use(function (req, res, next) {
    console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
    return next();
});

app.use('/admin', function(req, res, next) {
    console.log('%s %s - %s', (new Date).toString(), req.method, req.url);
    return next();
});
