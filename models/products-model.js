const mongoose = require('mongoose');
const ReviewModel = require('./review-model.js')
const Schema   = mongoose.Schema;

const productSchema = new Schema({
  // fields
  name: {
    type: String,
    required: [true, 'Please provide the product name']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price of min. $0 and max $3000'],
    min: [0, 'Your price is not a min. of $0'],
    max: [3000, 'Your price is not a max. of $3000']
  },
  imageUrl: {
    type: String,
    required: [true, 'An image is required to add a product']
  },
  description: {
    type: String,
    maxlength: 120
  },
  //Products have an array of reviews with all their information
  // (BlahModel.schema let's us acces the structure of the Review document);
  reviews: [ ReviewModel.schema ]
});

const ProductModel = mongoose.model('Product', productSchema);
// model name 'Product'
// collection name 'products'

module.exports = ProductModel;
