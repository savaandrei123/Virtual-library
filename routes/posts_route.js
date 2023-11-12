import express from 'express';
import Post from '../models/posts.js';
import Category from '../models/categories.js';

const postRouter = express.Router();

postRouter.post('/add', async (req, res) => {
  const post = new Post({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    author: req.body.author,
  });
  try {
    await post.save();
    res.redirect("/posts");
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

postRouter.get('/add', async (req, res) => {
  const categories = await Category.find();
  res.render('add_posts', {
    title: 'Add Posts',
    categories: categories,
  });
});

postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('category', 'name');
    const categories = await Category.find();
    res.render('posts', {
      title: 'Posts Page',
      posts: posts,
      categories: categories,
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

postRouter.get('/category/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const posts = await Post.find({ category: categoryId });
    const categories = await Category.find();
    res.render('posts', {
      title: 'Posts by Category',
      posts: posts,
      categories: categories
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

postRouter.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await Post.findByIdAndDelete(id);
    res.redirect('/posts');
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

postRouter.get('/edit/:id', async (req, res) => {
  try {
    const categories = await Category.find();
    const posts = await Post.findById(req.params.id);
    res.render('edit_posts', {
      title: 'Edit Post',
      posts: posts,
      categories: categories
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

postRouter.post('/update/:id', async (req, res) => {

  try {
    const id = req.params.id;
    await Post.findByIdAndUpdate(id, {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      author: req.body.author,
    });

    res.redirect("/posts/");
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

export default postRouter;
