const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./routes/url');
const app = express();

const PORT = 8001;

// Middleware to parse JSON bodies
app.use(express.json());

connectToMongoDB("mongodb://localhost:27017/short-url")
    .then(() => {
        console.log("MongoDB Connected");

        // Define routes after MongoDB connection is established
        app.use('/url', urlRoute);

        app.listen(PORT, () => {
            console.log(`Server Started at PORT ${PORT}`);
        });
    })
    .catch(err => {
        console.error("MongoDB connection error:", err);
        process.exit(1); // Exit process with failure
    });
