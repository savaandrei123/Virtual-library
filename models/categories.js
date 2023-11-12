import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
  posts: {
    type: Number,
    required: true,
    default: 0,
  },
  lastPost: {
    type: Date,
    required: true,
    default: 0,
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
