const express = require('express');
const router = express.Router();
const users = require("./userDb");
const posts = require('../posts/postDb');

router.post('/', validateUser , (req, res) => {
  try {
  users.insert(req.body)
  res.status(200).json(req.body)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.post('/:id/posts',validateUserId, validatePost, (req, res) => {
  try {
    posts.insert(req.body)
    res.status(200).json(req.body)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.get('/', (req, res) => {
  try {
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.get('/:id', validateUserId, (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.get('/:id/posts', validateUserId, (req, res) => {
  try {
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.delete('/:id', validateUserId, (req, res) => {
  try {
    users.remove(req.user)
    res.status(200).json(req.user)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

router.put('/:id', validateUserId, (req, res) => {
  try {
    users.update(req.user)
    res.status(200).json(req.user)
  } catch (err) {
    res.status(500).json({message: 'Error with server request'})
  }
});

//custom middleware

const validateUserId = (req, res, next) => {
  const { id } = req.params;
  users.getById(id).then(user => {
    if(user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({message: 'id not found'})
    }
  })
  .catch(error => {
    console.log(error);
    res.status(500).json({message:'error with request'})
  })
}

function validateUser(req, res, next) {
  const body = req.body;
  const name = req.body.name;
      if (!body) {
          res.status(400).json({ message: 'missing user data'})
      } else if (!name) {
          res.status(400).json({ message: 'missing required name field'})
      } else {
          next();
      }
}

function validatePost(req, res, next) {
  const body = req.body;
  const text = req.body.text;
  if (!body) {
      res.status(400).json({ message: 'missing post data'})
  } else if (!text) {
      res.status(400).json({ message: 'missing required text field'})
  } else {
      next()
  }
}

module.exports = router;
