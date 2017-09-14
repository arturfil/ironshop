const mongoose = require('mongoose');
const ProductModel = require('../models/products-model.js');

mongoose.connect('mongodb://localhost/ironshop');

const productArray = [
  {
    name: 'Bean Tacos',
    price: 5,
    imageUrl: 'https://media.giphy.com/media/EsDCYBUQM0KlO/giphy.gif',
    description: 'MMMMMM not real tacos...'
  },
  {
    name: 'Adidas Ultraboost',
    price: 0,
    imageUrl: 'https://media.giphy.com/media/O9Q7eixAAyGuA/giphy.gif',
    description: 'shoes'
  },
  {
    name: 'Fender',
    price: 10,
    imageUrl: 'https://media.giphy.com/media/3cdsMpe5PkH5K/giphy.gif',
    description: 'musical instrument'
  },
  {
    name: 'Nintendo Switch',
    price: 2,
    imageUrl: 'https://media.giphy.com/media/xUA7bibMNQQqk2U46s/giphy.gif',
    description: 'portable console'
  },
  {
    name: 'Monitor',
    price: 45,
    imageUrl: 'https://media.giphy.com/media/bSMSW4oDTMUgM/giphy.gif',
    description: 'electronics'
  }
];

ProductModel.create(
  // 1st argurment -> array of products to save
  productArray,

  //2nd argument -> callback
  (err, productAfterSave) => {
    if (err) {
      console.log('Create error 🤡');
      console.log(err);
      return;
    }

    productAfterSave.forEach((oneProduct) => {
      console.log('Success!');
      console.log('New Product ---> ' + oneProduct.name);
    })
    // check for errors
    // show succes for feedback
  }
);
