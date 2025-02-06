const express = require('express'); // ✅ Import Express
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp')
const AppError = require('./src/utils/appError'); // Ensure this file exists
const protectedRoutes = require('./src/routes/protectedRoutes')
const authRoutes = require('./src/routes/authRoutes')
const ErrorHandler = require('./src/middleware/errorMiddleware')


const app = express();

// Middleware
app.use(helmet()); // ✅ Security middleware

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // ✅ Logging
}


// prevent parameter pollution
app.use(hpp())

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});


app.use(express.json()); // ✅ Parse incoming JSON requests



//Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/protected", protectedRoutes);



// Handling unhandled routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

app.use(ErrorHandler);
// app.use(Endpoints)



module.exports = app;
