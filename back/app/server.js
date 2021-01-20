if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const session = require('express-session');
// const cors = require('cors');
const sanitizeHtml = require('sanitize-html');
const multer = require('multer');
const app = express();
const bodyParser = multer();


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5555;

const router = require('./router');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, DELETE');
    next();
});

app.use(express.json());
app.use(bodyParser.any());

// middleware to escape html in req.body
app.use((req, res, next) => {
    if (req.body) {
        for (const property in req.body) {
            req.body[property] = sanitizeHtml(req.body[property], {
                allowedTags: [],
                allowedAttributes: {}
            });
        }
    }
    next();
});

app.use('/v1', router);

app.launch = () => {
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
};

// toutes les promesses qu'on n'entoure pas d'un try/catch seront automatiquement stoppées ici si elles sont rejetées
process.on('unhandledRejection', (err) => {
    console.log('Interception d\'un rejet de promesse');
    console.error(err);
});

module.exports = app;