const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('./models/posts');

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
  res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post('/api/posts',(req,res,next) => {
  const post = new Post({
    title: req.body.title,
    body: req.body.body
  });
  console.log('Posts:', post);
  post.save().then(result => {
    console.log(result);
    res.status(201).json({message: "New Post added successfully", postId: result._id});
  });
})
app.get( '/api/posts',(req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({message: "Posts fetched successfully", posts: documents});
    });
});
app.delete('/api/posts/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post Deleted Successfully!"});
    })
    .catch(error => {
      console.log(error);
    });
});
module.exports = app;
