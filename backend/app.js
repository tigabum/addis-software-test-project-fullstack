const express = require("express");
const app = express();
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("../backend/routes/song.routes");
// use the cors middleware with the
// origin and credentials options
app.use(cors({ origin: true, credentials: true }));

// use the body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

const PORT = process.env.PORT || 8082;

connectDB();

app.get("/", (req, res) => res.send("server responding"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
