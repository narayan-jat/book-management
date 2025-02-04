// Updated models/Transaction.js
const mongoose = require ('mongoose');

const transactionSchema = new mongoose.Schema (
  {
    book_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    lender_id: {type: String, ref: 'User', required: true}, // Updated to use `String` for user-provided `_id`
    borrower_id: {type: String, ref: 'User', required: true}, 
    status: {
      type: String,
      enum: ['pending', 'success', 'fail'],
      required: true,
    },
    type: {
      type: String,
      enum: ['borrow', 'lend'], // Restrict to specific values
      required: true,
    },
    message: {type: String, required: false},
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Transaction', transactionSchema);
