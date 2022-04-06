const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router
  .route('/')
  .get(getAllThoughts)
  
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

// /api/users/:thoughtId/reactions
router
.route('/:thoughtId/reactions')
.post(addReaction)
.put(removeReaction);


module.exports = router;