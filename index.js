const express = require("express");
const mongoose = require('mongoose');

require("dotenv").config();

const app = require("./app");


mongoose.connect(process.env.URL_MONGODB, {
    useNewUrlParser:true,
});

app.listen(3333);