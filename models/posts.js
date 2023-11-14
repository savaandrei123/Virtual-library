import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  },
  lastPost: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
