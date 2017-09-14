const express = require('express');
const ProductModel = require('../models/products-model.js');
const router = express.Router();

router.get('/products', (req, res, next) => {
  ProductModel.find((err, allProducts) => {
    // if there's a database error return to avoid showing the view
    if (err) {
      // log the error message
      next(err);
      return
        //early return instead of 'else';
    }

    // send the results to the view
    res.locals.listOfProducts = allProducts;

    res.render('product-views/product-list');
  });// close ProductModel.find(...
});

// STEP #1 of the product create submission process
router.get('/products/new', (req, res, next) => {
  res.render('product-views/product-form.ejs');
});

// STEP #2 of the product create submission process
router.post('/products', (req, res, next) => {
  const theProduct = new ProductModel({
    name:req.body.productName,
    price:req.body.productPrice,
    imageUrl:req.body.productImageUrl,
    description:req.body.productDescription
  }); //
    // from SCHEMA | from INPUTS

  theProduct.save((err) => {
    // if there is a validation error...
    if (err && theProduct.errors) {
      // send messages to the view
      res.locals.errorMessages = theProduct.errors;
      res.render('product-views/product-form.ejs');
      // return to avoid showing the view
      return;
      // early return instead of 'else'
    }

    if (err && !theProduct.errors) {
      res.locals.errorMessages = theProduct.errors;
      // dkip to the error handler middleware
      next(err);
      // return to avoid showing the view
      return;
      // early return instead of 'else'
    }

    // STEP #3 redurect
    // ALWAYS redirect after a succesful post to avoid a resubmission
    res.redirect('/products');
    // You can only redirect to a URL
  });
});

router.get('/products/:prodId', (req, res, next) => {
  // <a href=/product..... prodId=...>
  // 'findById' will get one result from the DB (or null)
  ProductModel.findById(
    req.params.prodId,
    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }
      res.locals.productInfo = productFromDb;

      res.render('product-views/product-details.ejs');
    }
  );
});

router.get('/products/:prodId/edit', (req, res, next) => {
  // Because we want to prepopulate the form with data,
  // we need to requres the info from the database boforehand
  ProductModel.findById(
    req.params.prodId,

    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }

      res.locals.productInfo = productFromDb;

      res.render('product-views/edit-product.ejs');
    }
  );
});

router.post('/products/:prodId', (req, res, next) => {
  ProductModel.findById(
    req.params.prodId,

    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }

      productFromDb.name = req.body.productName;
      productFromDb.price = req.body.productPrice;
      productFromDb.imageUrl = req.body.productImageUrl;
      productFromDb.description = req.body.productDescription;
      console.log();
      productFromDb.save((err) => {
        if(err) {
          next(err);
          return;
        }

        res.redirect('/products');
      });
    }
  );
});

router.post('/products/:prodId/delete', (req, res, next) => {
  ProductModel.findByIdAndRemove(
    req.params.prodId,

    (err, productInfo) => {
      if(err) {
        next(err);
        return;
      };
      res.redirect('/products');
    }
  );
});

module.exports = router;
