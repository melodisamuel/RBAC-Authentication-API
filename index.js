const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// Load environment variables
dotenv.config({ path: './config.env' });

// Handle uncaught exceptions globally
process.on("uncaughtException", (err) => {
    console.error(err.name, err.message);
    process.exit(1);
});

// Connect to MongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {})
    .then(() => console.log('DB connection successful'))
    .catch((err) => console.error('DB connection failed:', err));

// Set up server and listen on the specified port
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

// Handle unhandled promise rejections globally
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! 💥 Shutting down...");
    console.error(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});
