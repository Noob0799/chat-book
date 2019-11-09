const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');

mongoose.connect("mongodb+srv://Sayantan:8vgHuDBrZSBa9KSN@cluster0-qgcsc.mongodb.net/chatbook?retryWrites=true&w=majority", { useNewUrlParser: true,  useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened: false}));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Accept, Content-type");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});
app.use('/api/posts', postRoutes);

module.exports = app;
