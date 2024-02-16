const express = require("express");
const app = express();

const PORT = process.env.PORT || 8082;

app.get("/", (req, res) => res.send("server responding"));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
