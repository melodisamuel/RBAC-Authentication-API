const mongoose = require('mongoose');
const dotenv = require('dotenv')

process.on("uncaughtException", (err) => {
    console.log(e);
    console.log(err.name, err.message);
    process.exit(1);
  });

const app = require('./app');

// Loadind environmental variables
dotenv.config({ path: './config.env' })


// Connect to mongoDB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {}).then(() => console.log('DB connection succesful'));



// PORT
const port = process.env.PORT || 3000;

// SERVER
const server = app.listen(port, () => {
    console.log(`App running on ${port}`);
})

process.on("unhandledRejection", (err) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(err.name, err.message);r
    server.close(() => {
      process.exit(1);
    });
  });

