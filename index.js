const express = require("express");
const mongoose = require('mongoose');

const f = require('util').format;
const fs = require('fs');


var ca = [fs.readFileSync(__dirname + "/ssl/ca.pem")];
var cert = fs.readFileSync(__dirname + "/ssl/client.pem");
var key = fs.readFileSync(__dirname + "/ssl/client.pem");

require("dotenv").config();

const app = require("./app");


mongoose.connect("mongodb+srv://teste:teste@cluster0-ovenc.mongodb.net/test?retryWrites=true&w=majority", {
 useNewUrlParser: true 
});

app.listen(3333);
