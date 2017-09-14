const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {type: String},
  stars: {
    type: Number,
    required: [true, 'Some stars-rating is required to submit the review'],
    min: 0,
    max: [5, 'Stars rating cannot be more than 5 stars.']
  },
  author: {
    type: String,
    required: [true, 'The author of the review is required in order to submit the review'],
    match: /.+@.+\..+/
  },
  //If we wanted to save reviews in their own collection,
  // we would need to save the product ID
  // product: {type: Schema...}
});

const ReviewModel = mongoose.model('Review', reviewSchema);

module.exports = ReviewModel;
