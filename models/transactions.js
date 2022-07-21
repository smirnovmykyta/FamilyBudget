import mongoose from "mongoose";


const transactionsSchema = new mongoose.Schema({
    type: {type: String, enum: ['income', 'expense']},
    category: String,
    value: Number,
},{ timestamps: true });

const Transactions = mongoose.model('transactions', transactionsSchema);

export default Transactions;
