const app = require("express")();
const logger = require("morgan");
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(require("./routes"));

module.exports = app;
