import React, { useContext, useEffect } from 'react';
import { IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

import CategoryContext from "../../../context/Wallet/Category/CategoryContext";
import PersonContext from "../../../context/Person/Person/PersonContext";

import { Styled } from "../../../design/style";
import InputForm from "../../../general_components/Forms/InputForm";
import SelectForm from "../../../general_components/Forms/SelectForm";

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

    //udpate transaction state when subtransaction amount input changes
    function handleAmountChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map( (subtransaction, i) => {
            if(i === parseFloat(e.target.id)) {
                subtransaction.amount = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
          ...existingTransaction,
          subtransactions: updatedSubtransactions
        }));
    };

    //udpate transaction state when subtransaction category input changes
    function handleCategoryChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map( (subtransaction, i) => {
            if(i === parseFloat(e.target.id)) {
                subtransaction.category.categoryId = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
          ...existingTransaction,
          subtransactions: updatedSubtransactions
        }));
    };

    //udpate transaction state when subtransaction person input changes
    function handlePersonChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map( (subtransaction, i) => {
            if(i === parseFloat(e.target.id)) {
                subtransaction.person.personId = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
          ...existingTransaction,
          subtransactions: updatedSubtransactions
        }));
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

        <div className='py-3'>

            {/*transaction subtransactions input form*/}
            {transaction.subtransactions.map( (subtransaction, index) => (

                <div>

                    <hr className="my-1"/>

                    <div className="row">

                        {/* delete subtransaction button */}
                        <div className="col-auto d-flex align-items-center px-1">
                            <Styled.TitleButton 
                                onClick={deleteSubtransaction}
                                >
                                <IoCloseCircleOutline id={index} />
                            </Styled.TitleButton>
                        </div>

                        {/* subtransaction form */}
                        <div className="col px-1">

                            {/* subtransaction's amount input' */}
                            <InputForm
                                value={subtransaction.amount}
                                onChangeField={handleAmountChange}
                                placeholder="amount..."
                                label="amount"
                                id={index}
                            />

                            {/* subtransaction's category input' */}
                            <SelectForm
                                value={subtransaction.category.categoryId}
                                arrayList={categories}
                                arrayValue="categoryId"
                                arrayDescription="description"
                                onChangeField={handleCategoryChange}
                                label="category"
                                id={index}
                            />

                            {/* subtransaction's person input' */}
                            <SelectForm
                                value={subtransaction.person.personId}
                                arrayList={people}
                                arrayValue="personId"
                                arrayDescription="nickname"
                                onChangeField={handlePersonChange}
                                label="person"
                                id={index}
                            />

                        </div>                        
                    </div>
                </div>
            ))}

            {/*add new subtransactions button*/}
            <div className="row">
                <div className="col-auto d-flex align-items-center px-0">
                    <Styled.TitleButton
                        onClick={addSubtransaction} 
                        className='align-items-start px-1'
                    >
                        <IoReturnDownForwardOutline/>
                    </Styled.TitleButton>
                </div>
            </div>

        </div>

    )

};