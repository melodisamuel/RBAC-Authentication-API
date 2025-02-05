const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // ✅ Load environment variables
const mongoose = require('mongoose');


process.on("uncaughtException", (err) => {
    console.log(err.name, err.message);
    process.exit(1);
  });


// Loadind environmental variables
dotenv.config({ path: './config.env' })


// Connect to mongoDB
console.log("DATABASE URL:", process.env.DATABASE); // Debugging
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {}).then(() => console.log('DB connection succesful'));



// PORT
const port = process.env.PORT || 5000;

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

