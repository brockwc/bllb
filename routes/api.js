const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/posts', postsController.getAllPosts);

// Protected Route
router.use(require('../config/auth'));
router.post('/posts', checkAuth, postsController.create);

// Helper Function
function checkAuth(req, res, next) {
  if (req.user) return next();
  console.log('in the checkAuth function');
  return res.status(401).json({msg: "Not Authorized"});
}

module.exports = router;