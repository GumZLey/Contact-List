const express = require("express");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectToDatabase = require("./infrastructure/database/database");

connectToDatabase();

const registerRoutes = require("./interfaces/routes");
registerRoutes(app);

app.listen(port, (err) => {
    if (err) {
        console.error("Error starting the server:", err);
        process.exit(1);
    }
    console.log("User list server started on: " + port);
});
