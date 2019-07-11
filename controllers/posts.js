const Post = require('../models/post');

module.exports = {
  getAllPosts,
  create
};

function getAllPosts(req, res) {
  Post.find({}, function(err, posts) {
    if (err) console.log(err);
    res.status(200).json(posts);
  });
}

function create(req, res) {
  console.log('Hit create')
  Post.create(req.body, function(err, post) {
    if (err) throw err;

    res.status(200).json(post);
  })
}