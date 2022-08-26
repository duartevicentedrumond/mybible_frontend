import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';

import InputForm from "../../general_components/Forms/InputForm";

export default function TransactionParentForm(data) {

    //define initial variables
    const [transaction, setTransaction] = data.transactionState;
    const [showModal, setShowModal] = data.showModalState;
    const [handleShowModal, handleCloseModal] = data.handleShowModalState;

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

    return (

        <Modal show={showModal}>
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