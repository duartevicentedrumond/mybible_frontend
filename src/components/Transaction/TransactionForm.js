import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';
import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import CategoryContext from "../../context/Wallet/Category/CategoryContext";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import PersonContext from "../../context/Person/Person/PersonContext";
import { Styled__Title, Styled__Input } from "../../design/style";
import { IoAdd, IoSync, IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

import InputForm from "./../../general_components/InputForm";

const TransactionForm = () => {

  const { addTransaction, transactions, updateTransaction } = useContext(TransactionContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { types, getTypes } = useContext(TypeContext);
  const { people, getPeople } = useContext(PersonContext);
  const history = useNavigate();
  const params = useParams();

  const [transaction, setTransaction] = useState({
    description: '',
    customId: null,
    date: '',
    types: [
      {
        typeId: '1',
        checked: true
      }
    ],
    subtransactions: [
      {
        amount: '',
        category: { categoryId: '1' },
        person: { personId: '0' }
      },
    ],
    transactionParent: { 
      transactionId: null,
      customId: null
    },
    deletedSubtransactions: []
  });

  const handleChange = e => {

    const index = e.target.id;

    if(e.target.name === "category"){

      transaction.subtransactions[index][e.target.name]['categoryId'] = e.target.value;

    } else if(e.target.name === "person"){
      transaction.subtransactions[index][e.target.name]['personId'] = e.target.value;
    } else if(e.target.name === "types"){

      var clonedTransaction = {...transaction};

      if (e.target.checked) {

        const lengthTypes = clonedTransaction.types.length;

        clonedTransaction.types[lengthTypes] = {
          typeId: parseFloat(e.target.value)
        }

        setTransaction({...transaction, clonedTransaction});

      } else {

        transaction.types = transaction.types.filter(
          (type) => type.typeId !== parseFloat(e.target.value)
        );

        setTransaction({...transaction, transaction});

        console.log(e.target.value)
        console.log(clonedTransaction)
      }
      
      console.log(transaction.types)

    } else if(e.target.name === "transactionParent"){
      transaction[e.target.name]['transactionId'] = e.target.value;
    } else {

      if(index === ''){ //field placed directly inside transaction; it is not an field from transaction's arrays
        transaction[e.target.name] = e.target.value;
      } else {
        transaction.subtransactions[index][e.target.name] = e.target.value;
      }
    }

    setTransaction({...transaction, transaction});
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

  //add new subtransaction
  const addSubtransaction = e => {
    
    //prevents page refresh on click
    e.preventDefault();

    const clonedTransaction = {...transaction};
    const lengthSubtransactions = clonedTransaction.subtransactions.length;

    clonedTransaction.subtransactions[lengthSubtransactions] = {
      amount: '',
      category: { categoryId: '1' },
      person: { personId: '1' }
    }

    setTransaction({...transaction, clonedTransaction});
    
  };


  const deleteSubtransaction = e => {
    e.preventDefault();

    transaction.subtransactions.splice(e.target.id, 1)

    setTransaction({...transaction, transaction});  
  };

  useEffect(
    () => {

      getCategories();
      getTypes();
      getPeople();

      const description = "description";

      const transactionFound = transactions.find( (transaction) => transaction.transactionId == params.id);

      if (transactionFound && transactionFound.transactionParent === null) {

        transactionFound.transactionParent = { 
          transactionId: null 
        };
      };

      console.log(transactionFound);

      if(transactionFound) {
        setTransaction(transactionFound);
      }

    }
  , [params.id, transactions]);

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
              object={transaction}
              setObject={setTransaction}
              name="description"
              field="description"
            />

            {/*transaction date input form*/}
            <InputForm
              object={transaction}
              setObject={setTransaction}
              name="date"
              field="date"
            />

            {/*transaction types input form*/}
            {types.map(

              (type) => (

                <div class="form-check">
                  <input 
                    class="form-check-input"
                    type="checkbox"
                    name="types"
                    checked={transaction.types.find( (typeTransaction) => typeTransaction.typeId == type.typeId)}
                    value={type.typeId}
                    onChange={handleChange}
                    id="flexCheckDefault"/>
                  <label class="form-check-label" for="flexCheckDefault">
                    {type.description}
                  </label>
                </div>

              )
            )}

            {/*transaction parent input form*/}
            <InputForm
              object={transaction}
              subObject="transactionParent"
              setObject={setTransaction}
              name="parent"
              field="transactionId"
            />

            {transaction.subtransactions.map( (subtransaction, index) => (
              <div>

                <hr className="my-1"/>

                <div className="row">

                  <div className="col-auto d-flex align-items-center px-1">

                    <Styled__Title.Button onClick={deleteSubtransaction} >
                      <IoCloseCircleOutline id={index} />
                    </Styled__Title.Button>

                  </div>

                  <div className="col px-1">

                    <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                      <Styled__Input.Label>amount</Styled__Input.Label>
                      <Styled__Input.Input
                        className="flex-fill"
                        type="text"
                        name="amount"
                        placeholder="amount..."
                        id={index}
                        onChange={handleChange}
                        value={subtransaction.amount}
                      />
                    </Styled__Input.Main>

                    <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                      <Styled__Input.Label>category</Styled__Input.Label>
                      <Styled__Input.Select
                        name="category"
                        aria-label="category"
                        id={index}
                        value={subtransaction.category.categoryId}
                        onChange={handleChange}
                      >
                        {categories.map( (category) => (
                          <option value={category.categoryId}>
                            {category.description}
                          </option>
                        ))}
                      </Styled__Input.Select>
                    </Styled__Input.Main>

                    <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
                      <Styled__Input.Label>person</Styled__Input.Label>
                      <Styled__Input.Select
                        name="person"
                        aria-label="person"
                        id={index}
                        value={subtransaction.person.personId}
                        onChange={handleChange}
                      >
                        {people.map( (person) => (
                          <option value={person.personId}>
                            {person.nickname}
                          </option>
                        ))}
                      </Styled__Input.Select>
                    </Styled__Input.Main>

                  </div>
                </div>
              </div>
              ))}

            {/*add new subtransactions button*/}
            <div className="row">
              <Styled__Title.Button onClick={addSubtransaction} className='d-flex align-items-center px-1'>
                <IoReturnDownForwardOutline/>
              </Styled__Title.Button>
            </div>

            <div>
              <div>
                <input
                  type="text"
                  placeholder="Name *"
                  value={transaction.description}
                  onChange = {handleChange}
                  required
                />
              </div>
            </div>

          </div>

        </form>
      </div>
    </div>
  )
};

export default TransactionForm;