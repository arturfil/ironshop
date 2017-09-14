const express = require('express');
const ProductModel = require('../models/products-model.js');
const router = express.Router();

router.get('/products/value', (req, res, next) => {
  ProductModel
    .find()
    .sort({ price: 'ascending' })
    .limit(10)
    .exec((err, valueProducts) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.listOfProducts = valueProducts;

      res.render('variations-views/value-products.ejs');
    });
});

router.get('/products/luxury', (req, res, next) => {
  ProductModel
    .find()
    .sort({ price: 'descending' })
    .limit(10)
    .exec((err, valueProducts) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.listOfProducts = valueProducts;

      res.render('variations-views/luxury-products.ejs');
    });
});

router.get('/products/search', (req, res, next) => {
  res.render('variations-views/product-search.ejs');
});

router.get('/products/search-results', (req, res, next) => {
  const mySearchRegex = new RegExp(req.query.searchTerm, 'i');
                                                        //|
                                                        //ignore case sensitive

  ProductModel.find(
    { name: mySearchRegex },
    // field from the schema to search
    // (check the model)

    (err, searchResults) => {
      if(err) {
        next(err);
        return;
      }

      res.locals.lastSearch = req.query.searchTerm;
      res.locals.listOfResults = searchResults;
      res.render('variations-views/results.ejs');
    }
  );
});

module.exports = router;
