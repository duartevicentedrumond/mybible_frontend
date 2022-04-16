import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import CategoryContext from "../../context/Wallet/Category/CategoryContext";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import { Styled__Title, Styled__Input } from "../../design/style";

const TransactionForm = () => {

  const { addTransaction, transactions, updateTransaction } = useContext(TransactionContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { types, getTypes } = useContext(TypeContext);
  const history = useNavigate();
  const params = useParams();

  const [transaction, setTransaction] = useState({
    description: '',
    date: '',
    amount: '',
    type: '',
    category: {
      categoryId: ''
    }
  });

  const handleChange = e => {
    setTransaction({...transaction, [e.target.name]: e.target.value});  
  };

  const handleSubmit = e => {
    e.preventDefault();

    if(transaction.transactionId){
      updateTransaction(transaction);
    }
    else{
      addTransaction(transaction);
    }

    history("/transaction");
  };

  useEffect(
    () => {

      getCategories();
      getTypes();

      const transactionFound = transactions.find( (transaction) => transaction.transactionId == params.id);

      if(transactionFound) {
        setTransaction(transactionFound);
      }
    }
  , [params.id, transactions]);

  return (
    <div className="d-flex flex-column text-start py-3 px-3">
      
      <div className="row">
        <Styled__Title.MainTitle>
          {transaction.transactionId ? 'Transaction #' + transaction.transactionId : 'New transaction'}
        </Styled__Title.MainTitle>
      </div>

      <div className="row">
        <form onSubmit={handleSubmit}>
          
          <div className="d-flex flex-column text-start py-3">

            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
              <Styled__Input.Label>description</Styled__Input.Label>
              <Styled__Input.Input
                className="flex-fill"
                type="text"
                name="description"
                placeholder="description..."
                onChange={handleChange}
                value={transaction.description}
              />
            </Styled__Input.Main>

            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
              <Styled__Input.Label>date</Styled__Input.Label>
              <Styled__Input.Input
                className="flex-fill"
                type="text"
                name="date"
                placeholder="date..."
                onChange={handleChange}
                value={transaction.date}
              />
            </Styled__Input.Main>
          
            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
              <Styled__Input.Label>amount</Styled__Input.Label>
              <Styled__Input.Input
                className="flex-fill"
                type="text"
                name="amount"
                placeholder="amount..."
                onChange={handleChange}
                value={transaction.amount}
              />
            </Styled__Input.Main>

            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
              <Styled__Input.Label>type</Styled__Input.Label>
              <Styled__Input.Select 
                class="form-select"
                name="type"
                aria-label="type"
                value={transaction.type.typeId}
                onChange={handleChange}
              >
                {types.map( (type) => (
                  <option value={type.typeId}>
                    {type.description}
                  </option>
                ))}
              </Styled__Input.Select>
            </Styled__Input.Main>

            <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
              <Styled__Input.Label>category</Styled__Input.Label>
              <Styled__Input.Select 
                class="form-select"
                name="category"
                aria-label="category"
                value={transaction.category.categoryId}
                onChange={handleChange}
              >
                {categories.map( (category) => (
                  <option value={category.categoryId}>
                    {category.description}
                  </option>
                ))}
              </Styled__Input.Select>
            </Styled__Input.Main>

          </div>

          <div className="d-flex flex-column text-start px-1">
            <button>
              {transaction.transactionId ? 'Update' : 'Add new'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
};

export default TransactionForm