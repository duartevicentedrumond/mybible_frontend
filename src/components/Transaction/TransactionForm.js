import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import { Styled__Title } from "../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import InputForm from "./../../general_components/InputForm";
import SubtransactionsForm from "../Subtransaction/SubtransactionForm";

export default function TransactionForm() {

  //define initial variables

    //get context for addTransaction and updateTransaction functions and transactions object
    const { addTransaction, transactions, updateTransaction } = useContext(TransactionContext);

    //get context for getTypes function and types object
    const { types, getTypes } = useContext(TypeContext);

    //get frontend directory
    const history = useNavigate();

    //get parameters from url
    const params = useParams();

    //set state for transaction
    const [transaction, setTransaction] = useState({
      description: null,
      customId: null,
      date: null,
      types: [
        {
          typeId: null
        }
      ],
      subtransactions: [
        {
          amount: null,
          category: { categoryId: '1' },
          person: { personId: '0' }
        },
      ],
      transactionParent: { 
        transactionId: null,
        customId: null
      }
    });

  //define handle transaction input changes

    //udpate transaction state when description input changes
    function handleDescriptionChange(e) {
      setTransaction(existingTransaction => ({
        ...existingTransaction,
        description: e.target.value
      }));
    };

    //udpate transaction state when date input changes
    function handleDateChange(e) {
      setTransaction(existingTransaction => ({
        ...existingTransaction,
        date: e.target.value
      }));
    };

    //udpate transaction state when types input changes
    function handleTypesChange(e) {

        //add new type to transaction if checked
        if (e.target.checked) {

          setTransaction(existingTransaction => ({
            ...existingTransaction,
            types: [
              ...existingTransaction.types,
              { typeId: parseFloat(e.target.value) }
            ]
          }));

        } else { //remove type from transaction if unchecked

          setTransaction(existingTransaction => ({
            ...existingTransaction,
            types: existingTransaction.types.filter(type => type.typeId !== parseFloat(e.target.value))
          }));
          
        }
    };

    //udpate transaction state when transaction parent input changes
    function handleTransactionParentChange(e) {
      setTransaction(existingTransaction => ({
        ...existingTransaction,
        transactionParent: {
          ...existingTransaction.transactionParent,
          transactionId: e.target.value
        }
      }));
    };

  //saves transaction and redirects to transactions list page
  const handleSubmit = e => {

    e.preventDefault();

    //if transaction already exists updates it
    if(transaction.transactionId){
      updateTransaction(transaction);
    }
    else{ //if transaction doesn't exist adds new
      addTransaction(transaction);
    }

    //redirects to transactions list page
    history("/transaction");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(
    () => {

      //get all existing types for dropdown input
      getTypes();

      //get transaction (if it exists) from the url id
      const transactionFound = transactions.find( (transaction) => transaction.transactionId == params.id);

      // if transaction exists from url id
      if(transactionFound) {

        //set transaction parent id to null when transaction does not have a transaction parent
        let transactionParent;

        if (transactionFound.transactionParent === null) {
          transactionParent = null;
        } else {
          transactionParent = transactionFound.transactionParent.transactionId;
        }

        //set transaction state to the values from url id transaction
        setTransaction(existingTransaction => ({
          ...existingTransaction,
          transactionId: transactionFound.transactionId,
          customId: transactionFound.customId,
          description: transactionFound.description,
          date: transactionFound.date,
          types: transactionFound.types,
          transactionParent: {
            ...existingTransaction.transactionParent,
            transactionId: transactionParent
          },
          subtransactions: transactionFound.subtransactions
        }));

      }

    }
  , [params.id, transactions]); //page first rendering depends on params.id and transactions

  return (
    <div className="d-flex flex-column text-start py-3 px-3">
      
      {/*transaction form title*/}
      <div className="d-inline-flex flex-row align-items-center">

        {/*If transaction exists sets transaction number to title*/}
        <Styled__Title.MainTitle className='d-flex pe-1'>
          {transaction.customId ? 'Transaction #' + transaction.customId : 'New transaction'}
        </Styled__Title.MainTitle>

        {/*Change upload button icon wether the it's a new transaction or an existing transaction*/}
        <Styled__Title.Button onClick={handleSubmit} className='d-flex'>
          {transaction.transactionId ? 
            <IoSync/> : 
            <IoAdd/>
          }
        </Styled__Title.Button>
      </div>

      <div className="row">
        <form>
          
          <div className="d-flex flex-column text-start py-3">

            {/*transaction description input form*/}
            <InputForm
              value={transaction.description}
              onChangeField={handleDescriptionChange}
              placeholder="description..."
              label="description"
            />

            {/*transaction date input form*/}
            <InputForm
              value={transaction.date}
              onChangeField={handleDateChange}
              placeholder="date..."
              label="date"
            />

            {/*transaction types input form*/}
            {types.map(
              (type, i) => (

                <div class="form-check">
                  <input 
                    class="form-check-input"
                    type="checkbox"
                    name="types"
                    id={i}
                    checked={transaction.types.find( transactionType => transactionType.typeId === type.typeId)}
                    value={type.typeId}
                    onChange={handleTypesChange}/>
                  <label class="form-check-label">
                    {type.description}
                  </label>
                </div>

              )
            )}

            {/*transaction transaction parent input form*/}
            <InputForm
              value={transaction.transactionParent.transactionId}
              onChangeField={handleTransactionParentChange}
              placeholder="parent..."
              label="parent"
            />

            {/*transaction subtransactions input form*/}
            <SubtransactionsForm
              transaction={transaction}
              setTransaction={setTransaction}
            />

          </div>

        </form>
      </div>
    </div>
  )
};