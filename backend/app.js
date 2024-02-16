const express = require("express");
const app = express();
const connectDB = require("./config/db");

const PORT = process.env.PORT || 8082;

connectDB();

app.get("/", (req, res) => res.send("server responding"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
