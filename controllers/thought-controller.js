const { User, Thought } = require('../models');
const { create } = require('../models/User');

const thoughtController = {

    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    // get thought by ID
    getThoughtById({ body }, res) {
        Thought.findOne({ _id: body._id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    // update thought by id
    updateThought({ body }, res) {
        Thought.findOneAndUpdate({ _id: body._id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

    //   add thought - works but user validation doesn't work properly
      createThought({ body }, res) {
        Thought.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

    // delete thought - need to update to remove from user
    deleteThought({ body }, res) {
    Thought.findOneAndDelete({ _id: body._id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // add reaction - improve no thought found
    addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true })
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json({message: 'Reaction has been added'});
        })
        .catch(err => res.json(err));
    },

    // remove reaction - not working
    removeReaction({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId }, { $pull: { reactions: body } }, { new: true })
        .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json({message: 'Reaction has been removed'});
        })
        .catch(err => res.json(err));
    },
    

}

module.exports = thoughtController;