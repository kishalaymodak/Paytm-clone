const express = require("express");
const mainRouter = require("./router/index");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

app.listen(port);
