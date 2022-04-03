const { User, Thought } = require('../models');

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
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
          .then(dbThoughtData => res.json(dbThoughtData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    // update thought by id -- not working
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.status(400).json(err));
      },

    //   add thought - works but need to fix associating with user and fix validation message
      createThought({ body }, res) {
        Thought.create(body, { new: true} )
          .then(createdThought => {
            if (!createdThought) {
              return res.status(404).json({ message: 'No User with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then(createdThought => {
            res.json(createdThought);
          })
          .catch(err => res.json(err));
      },

    // delete thought
    deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    // add reaction - need to fix no thought found
    addReaction({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true })
        .select('-__v')
        .then(dbThoughtData => {
        if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
        }
        res.json({message: 'Thought has been added'});
        })
        .catch(err => res.json(err));
    },

    // remove reaction - not working
    // removeReaction({ params, body }, res) {
    // Thought.findOneAndDelete({ _id: params.thoughtId }, { $pull: { reactions: body } }, { new: true })
    //     .then(dbUserData => {
    //     if (!dbUserData) {
    //         res.status(404).json({ message: 'No user found with this id!' });
    //         return;
    //     }
    //     res.json({message: 'Friend has been removed'});
    //     })
    //     .catch(err => res.json(err));
    // },
    

}

module.exports = thoughtController;