const express = require('express');
const bodyParser = require('body-parser');

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
  const post = req.body;
  console.log('Posts:', post);
  res.status(201).json({message: "New Post added successfully"});
})
app.get( '/api/posts',(req, res, next) => {
  const post = [
    { id: "f1sf1s13f1",
      title: "First post",
      body: "First server side post"
    },
    { id: "e5fs45s6f3",
      title: "Second post",
      body: "Second server side post"
    },
    { id: "3z5df43dg4",
      title: "Third post",
      body: "Third server side post"
    }];
  res.status(200).json({message: "Posts fetched successfully", posts: post});
});
module.exports = app;
