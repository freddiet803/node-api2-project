const express = require('express');
const router = express.Router();
const db = require('../data/db.js');

// ***************************************GET REQUEST*************************************/

////get posts
router.get('/', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' });
    });
});

////get post by id

router.get('/:id', (req, res) => {
  const id = req.params.id;
  //console.log(id);
  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        res.status(200).json(post);
      } else {
        // console.log('reached non exist post');
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'the post information could not be retrieved.' });
    });
});

//get post comments
router.get('/:id/comments', (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(comments => {
      if (comments.length > 0) {
        res.status(200).json(comments);
      } else {
        res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: 'The comments information could not be retrieved' });
    });
});

//**********************************END OF GET REQUEST************************************************ */

//***************************************POST REQUEST*********************************** */

// add new post
router.post('/', (req, res) => {
  const newPost = req.body;

  if (newPost.title && newPost.contents) {
    db.insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: 'There was an error while saving the post to the database'
        });
      });
  } else {
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post' });
  }
});

// add new comment to post
router.post('/:id/comments', (req, res) => {
  const id = req.params.id;
  const comment = req.body;
  comment.post_id = id;

  db.findById(id)
    .then(post => {
      if (post.length > 0) {
        if (comment.text) {
          db.insertComment(comment)
            .then(added => {
              res.status(201).json(added);
            })
            .catch(err => {
              res.status(500).json({
                error:
                  'There was an error while saving the comment to the database'
              });
            });
        } else {
          res
            .status(400)
            .json({ errorMessage: 'Please provide text for the comment' });
        }
      } else {
        res
          .status(404)
          .json({ message: 'the post with the specified ID does not exist' });
      }
    })
    .catch(err => {
      res
        .status(404)
        .json({ message: 'the post with the specified ID does not exist' });
    });
});

//***************************************END OF POST REQUEST********************************* */

//** PUT REQUEST*/

//** END OF PUT REQUEST*/

//**DELETE REQUEST */

//**END OF DELETE REQUEST */
module.exports = router;
