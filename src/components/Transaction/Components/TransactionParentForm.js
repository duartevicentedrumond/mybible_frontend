import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled__Title } from "../../../design/style";
import TransactionContext from "../../../context/Wallet/Transaction/TransactionContext";
import TransactionTable from "./TransactionTable";

import { RiParentLine } from "react-icons/ri";

export default function TransactionParentForm(data) {

    //define initial given variables
    const [transaction, setTransaction] = data.transactionState;
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    
    //get context for addTransaction and updateTransaction functions and transactions object
    const { transactions } = useContext(TransactionContext);

    //get parameters from url
    const params = useParams();

    //set filteredTransactions state
    const [filteredTransactions, setFilteredTransactions] = useState(transactions);

    //udpate transaction state when transaction parent input changes
    function handleTransactionParentChange(transactionParentId, transactionParentCustomId) {
        setTransaction(existingTransaction => ({
          ...existingTransaction,
          transactionParent: {
            ...existingTransaction.transactionParent,
            transactionId: transactionParentId,
            customId: transactionParentCustomId
          }
        }));
    };

    //set code to run on transaction list' rows click
    function onRowClick(e){
        
        //prevent page refresh
        e.preventDefault();

        const transactionId = e.target.dataset.transactionid;
        const customId = e.target.dataset.customid;

        //update transaction state when transaction parent input changes
        handleTransactionParentChange(transactionId, customId);

        handleCloseModal();

    };

    //run on the first render and anytime any dependency value changes
    useEffect(
        () => {

            //set current transaction ID from url
            const currentTransactionId = parseFloat(params.id);

            //update filtered transactions state to retrieve only transactions different than the current one
            setFilteredTransactions(
                existingFilteredTransactions => (
                    existingFilteredTransactions.filter(
                        (transaction) => (
                            transaction.transactionId !== currentTransactionId
                        )
                    )
                )
            );

        }
    , [params.id, transactions]); //page first rendering depends on params.id and transactions

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled__Title.MainTitle className='d-inline-flex flex-row align-items-center'>
                        <RiParentLine/> Transaction Parent
                    </Styled__Title.MainTitle>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*transactions list input form*/}
                <TransactionTable
                    transactions={filteredTransactions}
                    onRowClick={onRowClick}
                />
            </Modal.Body>
        </Modal>

    )

};