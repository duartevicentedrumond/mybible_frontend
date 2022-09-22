import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../../design/style";

import { RiParentLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SelectSectionModal(data) {

    //define initial given variables
        const showModal = data.showModal;
        const handleCloseModal = data.handleCloseModal;
        const SectionTable = data.SectionTable;
        const sections = data.sections;
        const onSectionClick = data.onSectionClick;
        const index = data.index;

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        Select Section
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <SectionTable
                    sections={sections}
                    onSectionClick={onSectionClick}
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