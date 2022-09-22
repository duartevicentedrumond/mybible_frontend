import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../../design/style";

import { RiParentLine } from "react-icons/ri";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function SelectRoomModal(data) {

    //define initial given variables
        const showModal = data.showModal;
        const handleCloseModal = data.handleCloseModal;
        const RoomTable = data.RoomTable;
        const rooms = data.rooms;
        const onRoomClick = data.onRoomClick;
        const index = data.index;

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        Select Room
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <RoomTable
                    rooms={rooms}
                    onRoomClick={onRoomClick}
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