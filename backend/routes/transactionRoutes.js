const Transaction = require ('../models/Transaction');

// Create a new transaction
exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction (req.body);
    await transaction.save ();
    res.status (201).json (transaction);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Get a transaction by ID
exports.getTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById (req.params.id).populate ([
      'book_id',
      'lender_id',
      'borrower_id',
    ]);
    if (!transaction)
      return res.status (404).json ({error: 'Transaction not found'});
    res.json (transaction);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Get all transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find ().populate ([
      'book_id',
      'lender_id',
      'borrower_id',
    ]);
    res.json (transactions);
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};

// Update transaction status
exports.updateTransactionStatus = async (req, res) => {
  try {
    const transaction = await Transaction.findById (req.params.id);
    if (!transaction)
      return res.status (404).json ({error: 'Transaction not found'});
    transaction.status = req.body.status;
    transaction.message = req.body.message || transaction.message;
    await transaction.save ();
    res.json (transaction);
  } catch (err) {
    res.status (400).json ({error: err.message});
  }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete (req.params.id);
    if (!transaction)
      return res.status (404).json ({error: 'Transaction not found'});
    res.json ({message: 'Transaction deleted successfully'});
  } catch (err) {
    res.status (500).json ({error: err.message});
  }
};
