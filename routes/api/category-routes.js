const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// GET /api/catagories
router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attribute: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attribute:['product_name', 'price', 'stock']
      }
    ]
  }) 
  .then(dbCategoryData =>res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// GET /api/catagories/1
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attribute:['product_name', 'price', 'stock']
      }
    ]
  })
    .then(dbCategoryData => {
      if (!dbCategoryData) {
        res.status(404).json({ message: 'No Category found with this id' });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// POST /api/catagories
router.post('/', (req, res) => {
  // create a new category
// expects {category_name: 'any'}
Category.create({
  category_name: req.body.category_name
})
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


// PUT /api/catagories/1
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id:req.params.id
    }
  })
    .then(dbCategoryData => {
      if (!dbCategoryData){
        res.status(404).json({message:'No catagory name found with this id'})
      return;
      }
      res.json({category:dbCategoryData, message:'category info. is updated'});
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
  // DELETE /api/catagories/1
router.delete('/:id', (req, res) => {
    // update a category by its `id` value
    Category.destroy({
      where: {
        id:req.params.id
      }
    })
      .then(dbCategoryData => {
        if (!dbCategoryData){
          res.status(404).json({message:'No catagory name found with this id'})
        return;
        }
        res.json({category:dbCategoryData, message:'The category has been deleted!'});
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

module.exports = router;
