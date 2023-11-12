import express from 'express';

const indexRouter = express.Router();

indexRouter.get('/', async (req, res) => {
  try {

    res.render('index', {
      title: 'Home Page',
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

export default indexRouter;
