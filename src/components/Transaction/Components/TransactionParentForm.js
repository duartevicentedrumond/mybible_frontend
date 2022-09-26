import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";
import TransactionTable from "./TransactionTable";

import { RiParentLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function TransactionParentForm(data) {

    //define initial given variables
    const [transaction, setTransaction] = data.transactionState;
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const transactions = data.Transactions;

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
    function onTransactionClick(e){
        
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
            const currentTransactionId = String(params.id);

            const filteredResult = transactions.filter((transaction) => {

                if (String(transaction.transactionId) !== currentTransactionId) {
                    return transaction
                };
                        
            })

            setFilteredTransactions(filteredResult);

        }
    , [params.id, transactions]); //page first rendering depends on params.id and transactions

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        <RiParentLine/> Transaction Parent
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*transactions list input form*/}
                <TransactionTable
                    Transactions={filteredTransactions}
                    onTransactionClick={onTransactionClick}
                    handleCloseModal={handleCloseModal}
                />
            </Modal.Body>
            <Modal.Footer>
                <Styled.TitleButton 
                    onClick={handleCloseModal}
                >
                    <IoCloseCircleOutline/>
                </Styled.TitleButton>
            </Modal.Footer>
        </Modal>

    )

};