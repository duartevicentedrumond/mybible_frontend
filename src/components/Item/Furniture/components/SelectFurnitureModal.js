import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../../design/style";

import { RiParentLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SelectFurnitureModal(data) {

    //define initial given variables
        const showModal = data.showModal;
        const handleCloseModal = data.handleCloseModal;
        const FurnitureTable = data.FurnitureTable;
        const furnitures = data.furnitures;
        const onFurnitureClick = data.onFurnitureClick;

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        Select Furniture
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FurnitureTable
                    furnitures={furnitures}
                    onFurnitureClick={onFurnitureClick}
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