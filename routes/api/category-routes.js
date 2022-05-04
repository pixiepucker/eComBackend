const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    //Product model
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ],
  })
    .then(dbCateData => res.json(dbCateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      },
    ],
  })
    .then(dbCateData => {
      if (!dbCateData) {
        res.status(404).json({ message: 'No category with this id exists!' });
        return;
      }
      res.json(dbCateData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name,
  })
    .then(dbCateData => res.json(dbCateData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then(dbCateData => {
      if (!dbCateData) {
        res.status(400).json({ message: 'No category with that id exists!' });
        return;
      }
      res.json(dbCateData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(dbCateData => {
      if (!dbCateData) {
        res.status(404).json({ message: 'No category with that id exists!' });
        return;
      }
      res.json(dbCateData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
