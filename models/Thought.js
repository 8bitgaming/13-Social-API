const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
    reactionId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody:{
        type: String,
        required: 'Text is required',
        maxlength: 280
    },
    username:{
        type: String,
        required: 'Text is required',
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
          getters: true
        },
      }
)

const ThoughtSchema = new Schema(
    {
    thoughtText: {
        type: String,
        required: 'Text is required',
        trim: true,
        minlength: 1,
        maxlength: 280
        },
        createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
        },
        username: {
            type: String,
            Required: true
        },
        reactions: [ReactionSchema]
},
    {
        toJSON: {
          virtuals: true,
          getters: true
        },
        id: false
      }
)

CommentSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
  });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;