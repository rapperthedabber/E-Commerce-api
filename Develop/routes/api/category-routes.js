const router = require('express').Router();
const { Category, Product } = require('../../models');
//const productRoutes = require('./product-routes');
//const tagRoutes = require('./tag-routes');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const CategoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const CategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!CategoryData) {
      res.status(404).json({ message: 'No Category found with that id!' });
      return;
    }

    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const CategoryData = await Category.create({
      Category_id: req.body.Category.id,
    });
    res.status(200).json(CategoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = await Category.update({
      id: req.body.Category.id
    });
    res.status(200).json(categoryData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  })
  res.status(200).json(categoryData);
});

module.exports = router;
