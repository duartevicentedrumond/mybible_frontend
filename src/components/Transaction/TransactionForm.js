import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import CategoryContext from "../../context/Wallet/Category/CategoryContext";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import PersonContext from "../../context/Person/Person/PersonContext";
import { Styled__Title, Styled__Input } from "../../design/style";
import { IoAdd, IoSync, IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

const TransactionForm = () => {

  const { addTransaction, transactions, updateTransaction } = useContext(TransactionContext);
  const { categories, getCategories } = useContext(CategoryContext);
  const { types, getTypes } = useContext(TypeContext);
  const { people, getPeople } = useContext(PersonContext);
  const history = useNavigate();
  const params = useParams();

  const [transaction, setTransaction] = useState({
    description: '',
    date: '',
    type: {
      typeId: '1'
    },
    subtransactions: [
      {
        amount: '',
        category: { categoryId: '1' },
        person: { personId: '1' }
      },
    ],
    transactionParent: { transactionId: null },
    deletedSubtransactions: []
  });

  const handleChange = e => {

    const index = e.target.id;

    if(e.target.name === "category"){
      transaction.subtransactions[index][e.target.name]['categoryId'] = e.target.value;
    } else if(e.target.name === "person"){
      transaction.subtransactions[index][e.target.name]['personId'] = e.target.value;
    } else if(e.target.name === "type"){
      transaction[e.target.name]['typeId'] = e.target.value;
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

  const addSubtransaction = e => {
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
      
      <div className="d-inline-flex flex-row align-items-center">
        <Styled__Title.MainTitle className='d-flex pe-1'>
          {transaction.transactionId ? 'Transaction #' + transaction.transactionId : 'New transaction'}
        </Styled__Title.MainTitle>
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
              <Styled__Input.Label>type</Styled__Input.Label>
              <Styled__Input.Select
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
              <Styled__Input.Label>parent</Styled__Input.Label>
              <Styled__Input.Input
                className="flex-fill"
                type="text"
                name="transactionParent"
                placeholder="parent..."
                onChange={handleChange}
                value={transaction.transactionParent.transactionId}
              />
            </Styled__Input.Main>

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

            <div className="row">

              <Styled__Title.Button onClick={addSubtransaction} className='d-flex align-items-center px-1'>
                <IoReturnDownForwardOutline/>
              </Styled__Title.Button>

            </div>

          </div>

        </form>
      </div>
    </div>
  )
};

export default TransactionForm