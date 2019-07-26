const app = require("express")();
const logger = require("morgan");

app.use(logger("dev"));
app.use(require("./routes"));

module.exports = app;
