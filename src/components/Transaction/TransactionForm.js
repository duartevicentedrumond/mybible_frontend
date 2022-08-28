import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import { Styled } from "../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";
import { RiParentLine, RiHashtag } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";

import InputForm from "../../general_components/Forms/InputForm";
import DateForm from "../../general_components/Forms/DateForm";
import SubtransactionsForm from "./Components/SubtransactionForm";
import TransactionParentForm from "./Components/TransactionParentForm";
import TypesModal from "./Components/TypesModal";

export default function TransactionForm() {

  //define initial variables

    //get context for addTransaction and updateTransaction functions and transactions object
    const { addTransaction, transactions, updateTransaction, getTransactions } = useContext(TransactionContext);

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
      date: dateToString(new Date()),
      types: [
        {
          typeId: null,
          description: null
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
      },
      transactionChildren: []
    });

    //function to get string date from date object
    function dateToString(date) {

      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);
      const dateString = year + "-" + month + "-" + day;

      return dateString;

    };

  //define states and variables for transactionParent modal form

    //set state for showTransactionParentModal
    const [showTransactionParentModal, setShowTransactionParentModal] = useState(false);

    //set functions to handle state change
    function handleShowTransactionParentModal(e) {

      e.preventDefault();

      setShowTransactionParentModal(true);
    };

    function handleCloseTransactionParentModal() {
      setShowTransactionParentModal(false);
    };

  //define states and variables for types modal form

    //set state for showTypesModal
    const [showTypesModal, setShowTypesModal] = useState(false);

    //set functions to handle state change
    function handleShowTypesModal(e) {

      e.preventDefault();

      setShowTypesModal(true);
    };

    function handleCloseTypesModal() {
      setShowTypesModal(false);
    };

  //define handle transaction input changes

    //udpate transaction state when description input changes
    function handleDescriptionChange(e) {
      setTransaction(existingTransaction => ({
        ...existingTransaction,
        description: e.target.value
      }));
    };

    //udpate transaction state when date input changes
    function handleDateChange(date) {

      const dateString = dateToString(date);

      setTransaction(existingTransaction => ({
        ...existingTransaction,
        date: dateString
      }));
    };

  //saves transaction and redirects to transactions list page
  function handleSubmit(e) {

    e.preventDefault();

    //if transaction already exists updates it
    if(transaction.transactionId){
      updateTransaction(transaction);
    }
    else{ //if transaction doesn't exist adds new
      addTransaction(transaction);
    }

    //get transactions
    getTransactions();

    //redirects to transactions list page
    history("/transaction");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(
    () => {

      //get all existing types for dropdown input
      getTypes();

      //get transaction (if it exists) from the url id
      const transactionFound = transactions.find( (transaction) => transaction.transactionId === parseFloat(params.id));

      // if transaction exists from url id
      if(transactionFound) {

        //set transaction parent id to null when transaction does not have a transaction parent
        let transactionParent;
        let transactionParentCustomId;

        if (transactionFound.transactionParent === null) {
          transactionParent = null;
          transactionParentCustomId = null;
        } else {
          transactionParent = transactionFound.transactionParent.transactionId;
          transactionParentCustomId = transactionFound.transactionParent.customId;
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
            transactionId: transactionParent,
            customId: transactionParentCustomId
          },
          subtransactions: transactionFound.subtransactions,
          transactionChildren: transactionFound.transactionChildren
        }));

      }

    }
  , [params.id, transactions, getTypes]); //page first rendering depends on params.id and transactions

  return (
    <div className="d-flex flex-column text-start py-3 px-0">
      
      {/*transaction form title*/}
      <div className="d-inline-flex flex-row align-items-center">

        {/*If transaction exists sets transaction number to title*/}
        <Styled.Title className='d-flex pe-2'>
          {transaction.customId ? 'Transaction #' + transaction.customId : 'New transaction'}
        </Styled.Title>

        {/*Change upload button icon wether the it's a new transaction or an existing transaction*/}
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {transaction.transactionChildren ? 
            <IoSync/> : 
            <IoAdd/>
          }
        </Styled.TitleButton>
      </div>

      {/*transaction parent button for modal input form*/}
      <div className="d-inline-flex flex-row align-items-center py-0">
        <Styled.TitleButton 
          onClick={handleShowTransactionParentModal} className='d-flex'
          style={{fontSize: "18px"}}
        >
          <RiParentLine/>
        </Styled.TitleButton>
        {transaction.transactionParent.transactionId ? 
          <Styled.InfoText>#{transaction.transactionParent.customId}</Styled.InfoText> : <div></div>
        }
        {transaction.transactionChildren[0] ? 
          <TiFlowChildren
            className='mx-2'
          /> : 
          <div></div>
        }
        {transaction.transactionChildren.map(
          (child) => (
            <Styled.InfoText
              className='me-2'
            >
              #{child.customId}
            </Styled.InfoText>
          )
        )}
      </div>

      {/*transaction parent modal input form*/}
      <TransactionParentForm
        transactionState={[transaction, setTransaction]}
        showModal={showTransactionParentModal}
        handleCloseModal={handleCloseTransactionParentModal}
        transactions={transactions}
      />

      {/*transaction types button for modal input form*/}
      <div className="d-inline-flex flex-row align-items-center pt-1">
        <Styled.TitleButton 
          onClick={handleShowTypesModal}
          className='d-flex'
          style={{fontSize: "18px"}}
        >
          <RiHashtag/>
        </Styled.TitleButton>
        {types.map(
          (type) => (
            transaction.types.filter( transactionType => transactionType.typeId === type.typeId).map(filteredTransactionType => (
              <Styled.InfoHashTagText
                className='me-2 px-2'
              >
                #{type.description}
              </Styled.InfoHashTagText>
            ))
          )
        )}
      </div>

      {/*transaction types modal input form*/}
      <TypesModal
        transactionState={[transaction, setTransaction]}
        showModal={showTypesModal}
        handleCloseModal={handleCloseTypesModal}
        types={types}
      />

      <div className="row">
        <div className="d-flex flex-column text-start py-2">

          {/*transaction description input form*/}
          <InputForm
            value={transaction.description}
            onChangeField={handleDescriptionChange}
            placeholder="description..."
            label="description"
          />

          {/*transaction date input form*/}
          <DateForm
            value={transaction.date}
            onChangeField={handleDateChange}
            placeholder="date..."
            label="date"
          />

          {/*transaction subtransactions input form*/}
          <SubtransactionsForm
            transaction={transaction}
            setTransaction={setTransaction}
          />
        
          </div>

        </div>
    </div>
  )
};