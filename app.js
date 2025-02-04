const rateLimit = require('express-rate-limit')
const helmet = require('helmet');






const app = express();
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Handling unhandled routes 
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`))
});
