import React, { useContext, useEffect } from 'react';
import { IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

import CategoryContext from "../../context/Wallet/Category/CategoryContext";
import PersonContext from "../../context/Person/Person/PersonContext";

import { Styled__Title, Styled__Input } from "../../design/style";

export default function SubtransactionsForm(data) {

    //define initial variables
        const transaction = data.transaction;
        const setTransaction = data.setTransaction;

        //get context for getCategories function and categories object
        const { categories, getCategories } = useContext(CategoryContext);

        //get context for getPeople function and people object
        const { people, getPeople } = useContext(PersonContext);

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        //retrieve existing subtransaction categories and people
        getCategories();
        getPeople();

    }
  , []); //no dependency

    //udpate transaction state when subtransactions input changes
    function handleChange(e) {

        const index = e.target.id;

        if(e.target.name === "category"){
            transaction.subtransactions[index][e.target.name]['categoryId'] = e.target.value;

        } else if(e.target.name === "person"){
            transaction.subtransactions[index][e.target.name]['personId'] = e.target.value;
        } else {

            if(index === ''){ //field placed directly inside transaction; it is not an field from transaction's arrays
                transaction[e.target.name] = e.target.value;
            } else {
                transaction.subtransactions[index][e.target.name] = e.target.value;
            }
        }

        setTransaction({...transaction, transaction});
    };

    //update transaction state with new subtransaction
    function addSubtransaction(e) {
        
        //prevents page refresh on click
        e.preventDefault();

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: [
                ...existingTransaction.subtransactions,
                { 
                    amount: null,
                    category: { categoryId: '1' },
                    person: { personId: '0' }
                }
            ]
        }));
        
    };

    //update transaction state by deleting existing subtransaction
    function deleteSubtransaction(e) {

        //prevents page refresh on click
        e.preventDefault();

        console.log()

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: existingTransaction.subtransactions.filter(
                (subtransaction, index) => parseFloat(index) !== parseFloat(e.target.id)
            )
        }));    
    };

    return (

        <div>

            {/*transaction subtransactions input form*/}
            {transaction.subtransactions.map( (subtransaction, index) => (

                <div>

                    <hr className="my-1"/>

                    <div className="row">

                        {/* delete subtransaction button */}
                        <div className="col-auto d-flex align-items-center px-1">
                            <Styled__Title.Button onClick={deleteSubtransaction} >
                                <IoCloseCircleOutline id={index} />
                            </Styled__Title.Button>
                        </div>

                        {/* subtransaction form */}
                        <div className="col px-1">

                            {/* subtransaction's amount input' */}
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

                            {/* subtransaction's category input' */}
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

                            {/* subtransaction's person input' */}
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

                    {/*add new subtransactions button*/}
                    <div className="row">
                    <Styled__Title.Button onClick={addSubtransaction} className='d-flex align-items-center px-1'>
                        <IoReturnDownForwardOutline/>
                    </Styled__Title.Button>
                    </div>

                </div>
            ))}

        </div>

    )

};