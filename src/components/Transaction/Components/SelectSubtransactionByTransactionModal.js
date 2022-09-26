import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";

import { RiParentLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SelectSubtransactionByTransactionModal(data) {

    //define initial given variables
        const showModal = data.showModal;
        const handleCloseModal = data.handleCloseModal;
        const SubtransactionsByTransactionTable = data.SubtransactionsByTransactionTable;
        const subtransactionsByTransaction = data.Transactions;
        const onSubtransactionClick = data.OnSubtransactionClick;
        const index = data.index;

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        Select Transaction
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SubtransactionsByTransactionTable
                    Transactions={subtransactionsByTransaction}
                    OnSubtransactionClick={onSubtransactionClick}
                    handleCloseModal={handleCloseModal}
                    index={index}
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