const express = require('express');
const Post = require('../models/posts');
const router = express.Router();

router.post('',(req,res,next) => {
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
router.get( '',(req, res, next) => {
  Post.find()
    .then(documents => {
      console.log(documents);
      res.status(200).json({message: "Posts fetched successfully", posts: documents});
    });
});

router.get( '/:id',(req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json({message: "Post fetched successfully", post: post});
      } else {
        res.status(404).json({message: "Post not found!"});
      }
    });
});

router.put('/:id',(req,res,next) => {
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    body: req.body.body
  });
  Post.updateOne({_id: req.params.id}, post)
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post updated successfully"});
    });
});

router.delete('/:id', (req, res, next) => {
  Post.deleteOne({_id: req.params.id})
    .then(result => {
      console.log(result);
      res.status(200).json({message: "Post Deleted Successfully!"});
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
