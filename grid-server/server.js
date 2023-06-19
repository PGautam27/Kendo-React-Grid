const express = require("express");
const cors = require("cors");
const router = require("./src/routes/routes");
const port = process.env.port || 5951;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", router);

app.listen(port);
