import express from 'express';
import Category from '../models/categories.js';
import Post from '../models/posts.js';
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    const latestPosts = await Post.find().populate('category', 'name').sort({ lastPost: -1 }).limit(3);
    const newCategories = await Promise.all(categories.map(async (category) => {
      const postCount = await Post.countDocuments({ category: category._id });
      const lastPost = await Post.findOne({ category: category._id }).sort({ lastPost: -1 });
      const lastPostDate = lastPost ? lastPost.lastPost : 0;

      return { ...category.toObject(), posts: postCount, lastPost: lastPostDate };
    }));
    res.render('categories', {
      title: 'Categories',
      categories: newCategories,
      latestPosts: latestPosts
    });

  } catch (err) {
    res.json({ message: err.message });
  }
});

categoryRouter.post('/add', async (req, res) => {
  const category = new Category({
    name: req.body.name,
  });
  try {
    await category.save();
    res.redirect("/categories");
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

categoryRouter.post('/update/:id', async (req, res) => {

  try {
    const id = req.params.id;
    await Category.findByIdAndUpdate(id, {
      name: req.body.name,
      posts: req.body.posts,
    });

    res.redirect("/categories");
  } catch (err) {
    res.json({ message: err.message, type: 'danger' });
  }
});

categoryRouter.get('/delete/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const postsWithCategory = await Post.countDocuments({ category: id });

    if (postsWithCategory > 0) {
      return res.redirect('/categories');
    } else {
      await Category.findByIdAndDelete(id);
      res.redirect('/categories');
    }
  } catch (err) {
    res.redirect('/categories');
  }
});

export default categoryRouter;
