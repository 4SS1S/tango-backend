const express = require("express");
const mongoose = require('mongoose');

const f = require('util').format;
const fs = require('fs');


require("dotenv").config();

const app = require("./app");


mongoose.connect("mongodb+srv://teste:teste@cluster0-ovenc.mongodb.net/test?retryWrites=true&w=majority", {
 useNewUrlParser: true 
});

app.listen(process.env.PORT || 3333);
