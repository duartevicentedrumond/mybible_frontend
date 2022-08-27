import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import InputForm from "../../../general_components/Forms/InputForm";
import TransactionList from "../TransactionList";

export default function TransactionParentForm(data) {

    //define initial variables
    const [transaction, setTransaction] = data.transactionState;
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;

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

    function onRowClick(e){
        console.log(e.target)
    };

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>Transaction Parent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*transaction description input form*/}
                <InputForm
                    value={transaction.transactionParent.transactionId}
                    onChangeField={handleTransactionParentChange}
                    placeholder="parent..."
                    label="parent"
                />
                <TransactionList/>
            </Modal.Body>
            <Modal.Footer>
                <button
                    onClick={handleCloseModal}
                >
                    Close
                </button>
            </Modal.Footer>
        </Modal>

    )

};