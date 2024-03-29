import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { IoCloseCircleOutline } from "react-icons/io5";

import { Styled } from "../../design/style";
import ItemForm from "./Item/ItemForm";
import BoxForm from "./Box/BoxForm";
import SectionForm from "./Section/SectionForm";
import RoomForm from "./Room/RoomForm";
import FurnitureForm from "./Furniture/FurnitureForm";
import BuildingForm from "./Building/BuildingForm";

export default function AddItemModal(data) {

    //define initial given variables
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const [items, addItem, updateItem] = data.Items;
    const [boxes, addBox, updateBox] = data.Boxes;
    const [sections, addSection, updateSection] = data.Sections;
    const [furnitures, addFurniture, updateFurniture] = data.Furnitures;
    const [rooms, addRoom, updateRoom] = data.Rooms;
    const [buildings, addBuilding, updateBuilding] = data.Buildings;

    //set state for modal title
    const [itemType, setItemType] = useState("Item");

    //set state for showAddItem
    const [showAddItem, setShowAddItem] = useState(true);
    //set functions to handle state change
    function handleShowAddItem(e) {  
        setShowAddItem(true);
        setItemType("Item");

        handleHideAddBox();
        handleHideAddSection();
        handleHideAddFurniture();
        handleHideAddRoom();
        handleHideAddBuilding();
    };
    function handleHideAddItem() {
        setShowAddItem(false);
    };

    //set state for showAddBox
    const [showAddBox, setShowAddBox] = useState(false);
    //set functions to handle state change
    function handleShowAddBox(e) {  
        setShowAddBox(true);
        setItemType("Box");

        handleHideAddItem();
        handleHideAddSection();
        handleHideAddFurniture();
        handleHideAddRoom();
        handleHideAddBuilding();
    };
    function handleHideAddBox() {
        setShowAddBox(false);
    };

    //set state for showAddSection
    const [showAddSection, setShowAddSection] = useState(false);
    //set functions to handle state change
    function handleShowAddSection(e) {  
        setShowAddSection(true);
        setItemType("Section");

        handleHideAddItem();
        handleHideAddBox();
        handleHideAddFurniture();
        handleHideAddRoom();
        handleHideAddBuilding();
    };
    function handleHideAddSection() {
        setShowAddSection(false);
    };

    //set state for showAddFurniture
    const [showAddFurniture, setShowAddFurniture] = useState(false);
    //set functions to handle state change
    function handleShowAddFurniture(e) {  
        setShowAddFurniture(true);
        setItemType("Furniture");

        handleHideAddItem();
        handleHideAddBox();
        handleHideAddSection();
        handleHideAddRoom();
        handleHideAddBuilding();
    };
    function handleHideAddFurniture() {
        setShowAddFurniture(false);
    };

    //set state for showAddRoom
    const [showAddRoom, setShowAddRoom] = useState(false);
    //set functions to handle state change
    function handleShowAddRoom(e) {  
        setShowAddRoom(true);
        setItemType("Room");

        handleHideAddItem();
        handleHideAddBox();
        handleHideAddSection();
        handleHideAddFurniture();
        handleHideAddBuilding();
    };
    function handleHideAddRoom() {
        setShowAddRoom(false);
    };

    //set state for showAddBuilding
    const [showAddBuilding, setShowAddBuilding] = useState(false);
    //set functions to handle state change
    function handleShowAddBuilding(e) {  
        setShowAddBuilding(true);
        setItemType("Building");

        handleHideAddItem();
        handleHideAddBox();
        handleHideAddSection();
        handleHideAddFurniture();
        handleHideAddRoom();
    };
    function handleHideAddBuilding() {
        setShowAddBuilding(false);
    };

    return (

        <Modal 
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        Add New {itemType}
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className='row'>
                        <div className="col-10 text-start py-3">

                            <ul className="nav nav-tabs">
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddItem}
                                    >
                                        Item
                                    </Styled.SecondaryNavBarLink>
                                </li>
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddBox}
                                    >
                                        Box
                                    </Styled.SecondaryNavBarLink>
                                </li>
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddSection}
                                    >
                                        Section
                                    </Styled.SecondaryNavBarLink>
                                </li>
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddFurniture}
                                    >
                                        Furniture
                                    </Styled.SecondaryNavBarLink>
                                </li>
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddRoom}
                                    >
                                        Room
                                    </Styled.SecondaryNavBarLink>
                                </li>
                                <li className="nav-item pe-3">
                                    <Styled.SecondaryNavBarLink 
                                        to='#'
                                        onClick={handleShowAddBuilding}
                                    >
                                        Building
                                    </Styled.SecondaryNavBarLink>
                                </li>
                            </ul> 
                        </div>
                    </div>

                    { showAddItem ? 
                        <ItemForm 
                            items={[items, addItem, updateItem, boxes, sections, furnitures, rooms, buildings]}
                            handleCloseModal={handleCloseModal}
                        /> 
                        : null
                    }
                    { showAddBox ? 
                        <BoxForm 
                            items={[items, boxes, addBox, updateBox, sections, furnitures, rooms, buildings]}
                            handleCloseModal={handleCloseModal}
                        /> 
                        : null
                    }
                    { showAddSection ? 
                        <SectionForm 
                            items={[items, boxes, sections, addSection, updateSection, furnitures, rooms, buildings]}
                            handleCloseModal={handleCloseModal}
                        />
                        : null}
                    { showAddFurniture ? 
                        <FurnitureForm 
                            items={[items, boxes, sections, furnitures, addFurniture, updateFurniture, rooms, buildings]}
                            handleCloseModal={handleCloseModal}
                        />
                    : null}
                    { showAddRoom ? 
                        <RoomForm 
                            items={[items, boxes, sections, furnitures, rooms, addRoom, updateRoom, buildings]}
                            handleCloseModal={handleCloseModal}
                        />
                        : null}
                    { showAddBuilding ? 
                        <BuildingForm 
                            items={[items, boxes, sections, furnitures, rooms, buildings, addBuilding, updateBuilding]}
                            handleCloseModal={handleCloseModal}
                        /> 
                        : null}

                </div>
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