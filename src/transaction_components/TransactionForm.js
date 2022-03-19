import React, { useState, useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";

const TransactionForm = () => {

  const { addTransaction, transactions, updateTransaction } = useContext(GlobalContext);
  const history = useNavigate();
  const params = useParams();

  const [transaction, setTransaction] = useState({
    description: '',
    date: '',
    amount: '',
    type: '',
    category: ''
  });

  const handleChange = e => {
    setTransaction({...transaction, [e.target.name]: e.target.value});  
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(transaction.id){
      updateTransaction(transaction);
    }
    else{
      addTransaction(transaction);
    }

    history("/");
  };

  useEffect(
    () => {

      const transactionFound = transactions.find( (transaction) => transaction.id == params.id);

      if(transactionFound) {
        setTransaction(transactionFound);
      }
    }
  , [params.id, transactions]);

  return (
    <div>
      <h2>
        {transaction.id ? 'Editing' : 'Creating'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex">

          <input 
            type="text"
            name="description"
            placeholder="description..."
            onChange={handleChange}
            value={transaction.description}
          />
          <input 
            type="text"
            name="date"
            placeholder="date..."
            onChange={handleChange}
            value={transaction.date}
          />
          <input 
            type="text"
            name="amount"
            placeholder="amount..."
            onChange={handleChange}
            value={transaction.amount}
          />
          <input 
            type="text"
            name="type"
            placeholder="type..."
            onChange={handleChange}
            value={transaction.type}
          />
          <input 
            type="text"
            name="category"
            placeholder="category..."
            onChange={handleChange}
            value={transaction.category}
          />

        </div>

        <button>
          {transaction.id ? 'Edit' : 'Create'}
        </button>
      </form>
    </div>
  )
};

export default TransactionForm