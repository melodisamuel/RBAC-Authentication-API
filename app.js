const express = require('express'); // ✅ Import Express
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const AppError = require('./utils/appError'); // Ensure this file exists

const app = express();

// Middleware
app.use(helmet()); // ✅ Security middleware

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // ✅ Logging
}

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Handling unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

module.exports = app;
