const express = require('express');
const ProductModel = require('../models/products-model.js');
const ReviewModel = require('../models/review-model.js');
const router = express.Router();


router.get('/products/:prodId/reviews/new', (req, res, next) => {
  // retrieve product from the database
  ProductModel.findById(
    req.params.prodId,
    // check for errors
    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }
      // if no errors...
      res.locals.productInfo = productFromDb;

      res.render('review-views/review-form.ejs');
    }
  );
});

router.post('/products/:prodId/reviews', (req, res, next) => {
  // retrieve the product from the database
  ProductModel.findById(
    req.params.prodId,

    (err, productFromDb) => {
      if(err) {
        next(err);
        return;
      }

      const theReview = new ReviewModel({
        content: req.body.reviewContent,
        stars: req.body.reviewStars,
        author: req.body.reviewAuthor
      });

      productFromDb.reviews.push(theReview);

      productFromDb.save((err) => {

        if(err && productFromDb.errors) {
          res.locals.errorMessages = productFromDb.errors;
          res.locals.productInfo = productFromDb;

          res.render('review-views/review-form.ejs');
          return;
        }
        if(err && !productFromDb.errors) {
          next(err);
          return;
        }
        res.redirect('/products/' + productFromDb._id);
      });
    }
  );
});

module.exports = router;
