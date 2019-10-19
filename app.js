const express = require('express');
const app = express();
const cors = require('cors')
const morgan = require('morgan');

// ROUTES.
const userRoutes = require('./app/routes/users');

// Body parser.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Logging requests.
app.use(morgan('dev'));

// Handling CORS to all requisitions.
app.use(cors());

// Assigning routes.
app.use('/users', userRoutes);

// 404 error.
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    res.send({hello: 'OK COMPUTER - Welcome to the webservice for the OCEANLI project. If you were trying to acess a route, this one does not exist.', err: error});
});

module.exports = app;
