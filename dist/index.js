"use strict";
const express = require('express');
const app = express();
function isNotMatch(input, regex) {
    return !regex.test(input);
}
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
});
app.get('/', (_req, res) => {
    res.send("<h1>Hello World</h1>");
});
app.get('/blog', (_req, res) => {
    res.redirect('/');
});
app.get('/api', (_req, res) => {
    res.json({
        name: 'John Doe',
        result: 'ok'
    });
});
app.get('/html', (_req, res) => {
    res.redirect(404, "/");
});
app.get('/err', (_req, res) => {
    res.status(404).send('404 - Not Found');
});
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/login", (req, res) => {
    console.log(req.body);
    res.json({
        message: 'Login Success',
        data: req.body
    });
});
const http = require('http');
app.get('/methods', (req, res) => {
    res.json({
        methods: http.METHODS,
        statusCodes: http.STATUS_CODES,
        headers: req.headers,
        hostname: req.hostname,
        ip: req.ip,
        method: req.method,
        protocol: req.protocol,
        url: req.url,
        params: req.params,
        query: req.query,
        body: req.body,
        subdomains: req.subdomains,
        globalAgent: http.globalAgent,
    });
    res.send(http.METHODS);
});
const debug = (req, _res, next) => {
    console.log('I am a middleware', req.method, req.url);
    next();
};
app.use(debug);
const auth = (req, res, next) => {
    console.log("middleware auth -->", req.method, req.url, req.query);
    if (req.query.username == "admin")
        next();
    else
        res.status(403).send("Unauthorized");
};
app.get("/admin", auth, (req, res) => {
    res.send("Admin Page");
});
const cors = require('cors');
app.get("/search", cors(), (req, res) => {
    res.send("search page");
});
const corsOptions = {
    origin: 'http://ziting.com',
    optionSuccessStatus: 200
};
app.get("/app/search", cors(corsOptions), (req, res) => {
    if (req) {
        res.send("search page");
    }
    else {
        res.send("nono page");
    }
});
