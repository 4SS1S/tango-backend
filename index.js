const express = require("express");
const mongoose = require('mongoose');

const f = require('util').format;
const fs = require('fs');


var ca = [fs.readFileSync(__dirname + "/ssl/ca.pem")];
var cert = fs.readFileSync(__dirname + "/ssl/client.pem");
var key = fs.readFileSync(__dirname + "/ssl/client.pem");

require("dotenv").config();

const app = require("./app");


mongoose.connect(process.env.URL_MONGODB, {
  server: {
      sslValidate:true
    , sslCA:ca
    , sslKey:key
    , sslCert:cert
    , sslPass:'10gen'
  }
}, function(err, db) {
  db.close();
});

app.listen(3333);
