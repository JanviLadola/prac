const session = require('express-session')
const adminApp = require('./routes/admin')

const express = require('express'),
    app = express(),
    fileUpload = require('express-fileupload'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    sessionParser = require('express-session'),
    swaggerUi = require('swagger-ui-express'),
    //swaggerDoc = require('./admin.swagger.json')
    swaggerDoc = require('./user.swagger.json')


//console.clear()
console.clear()
console.log('started..')

// DATABASE CONNECTION
const mongoose = require('mongoose');
url = `mongodb+srv://root:lqGtjS8FQ077WbpA@cluster0.lfolw.mongodb.net/demo?retryWrites=true&w=majority`;

const mongooseConnection = mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
}, function(err, db) {
    if (err)
        console.log('err : ', err)
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(cookieParser())
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }))
app.use(fileUpload())

app.use('/admin', require('./routes/admin'))
app.use('/user', require('./routes/user'))
app.use('/admin', (req, res) => {
    return res.status(200).send('DONE..')
});
var user = {
    name: "Janvi"
}
app.use(session({
    secret: "abcstrcyswjh",
    resave: true,
    saveUninitialized: true
}));

app.use((req, res, next) => {
    console.log(req.session);

    next()
})
app.use('/cookie', (req, res) => {
    res.cookie("user", user, { maxAge: 1000 * 60 * 60 * 24 * 30 })
    res.send(req.cookies);
})
app.use('/getCookie', (req, res) => {
    res.send(req.cookies.user);
})

app.use('/session', (req, res) => {
    req.session.name = "Janvi";
    return res.send("session set");
})
app.use('/getSession', (req, res) => {
    return res.send(req.session.name);
})

app.use('*', (req, res) => {
    return res.status(400).send('unknownApi')
})




module.exports = app;