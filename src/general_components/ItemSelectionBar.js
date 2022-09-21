import React, { useState } from 'react';
import { MdOutlineHouse, MdOutlineMeetingRoom } from "react-icons/md";
import { BiBed, BiLayout, BiFootball } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";

import SelectBuildingModal from "../components/Item/Building/components/SelectBuildingModal";
import SelectRoomModal from "../components/Item/Room/components/SelectRoomModal";
import SelectFurnitureModal from "../components/Item/Furniture/components/SelectFurnitureModal";
import SelectSectionModal from "../components/Item/Section/components/SelectSectionModal";
import SelectBoxModal from "../components/Item/Box/components/SelectBoxModal";
import SelectItemModal from "../components/Item/Item/components/SelectItemModal";

import { Styled } from "../design/style";

export default function ItemSelectionBar(data) {

    //split input data through different objects for building
    const [buildingHidden, BuildingTable, buildings, onBuildingClick] = data.Building;

    //set state for showBuildingModal
    const [showBuildingModal, setShowBuildingModal] = useState(false);

    //set functions to handle state change
    function handleShowBuildingModal(e) {
      e.preventDefault();
      setShowBuildingModal(true);
    };

    function handleCloseBuildingModal() {
        setShowBuildingModal(false);
    };

    //split input data through different objects for room
    const [roomHidden, RoomTable, rooms, onRoomClick] = data.Room;

    //set state for showRoomModal
    const [showRoomModal, setShowRoomModal] = useState(false);

    //set functions to handle state change
    function handleShowRoomModal(e) {
        e.preventDefault();
        setShowRoomModal(true);
    };
  
    function handleCloseRoomModal() {
        setShowRoomModal(false);
    };

    //split input data through different objects for furniture
    const [furnitureHidden, FurnitureTable, furnitures, onFurnitureClick] = data.Furniture;

    //set state for showFurnitureModal
    const [showFurnitureModal, setShowFurnitureModal] = useState(false);

    //set functions to handle state change
    function handleShowFurnitureModal(e) {
        e.preventDefault();
        setShowFurnitureModal(true);
    };
  
    function handleCloseFurnitureModal() {
        setShowFurnitureModal(false);
    };

    //split input data through different objects for section
    const [sectionHidden, SectionTable, sections, onSectionClick] = data.Section;

    //set state for showSectionModal
    const [showSectionModal, setShowSectionModal] = useState(false);

    //set functions to handle state change
    function handleShowSectionModal(e) {
        e.preventDefault();
        setShowSectionModal(true);
    };
  
    function handleCloseSectionModal() {
        setShowSectionModal(false);
    };

    //split input data through different objects for box
    const [ boxHidden, BoxTable, boxes, onBoxClick] = data.Box;

    //set state for showBoxModal
    const [showBoxModal, setShowBoxModal] = useState(false);

    //set functions to handle state change
    function handleShowBoxModal(e) {
        e.preventDefault();
        setShowBoxModal(true);
    };
  
    function handleCloseBoxModal() {
        setShowBoxModal(false);
    };

    //split input data through different objects for item
    const [ itemHidden, ItemTable, items, onItemClick] = data.Item;

    //set state for showItemModal
    const [showItemModal, setShowItemModal] = useState(false);

    //set functions to handle state change
    function handleShowItemModal(e) {
        e.preventDefault();
        setShowItemModal(true);
    };
  
    function handleCloseItemModal() {
        setShowItemModal(false);
    };

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            { !buildingHidden ?
                <Styled.FormButton
                    onClick={handleShowBuildingModal}
                >
                    <MdOutlineHouse/>
                </Styled.FormButton>
                : null
            }
            { !roomHidden ?
                <Styled.FormButton
                    onClick={handleShowRoomModal}
                >
                    <MdOutlineMeetingRoom/>
                </Styled.FormButton>
                : null
            }
            { !furnitureHidden ?
                <Styled.FormButton
                    onClick={handleShowFurnitureModal}
                >
                    <BiBed/>
                </Styled.FormButton>
                : null
            }
            { !sectionHidden ?
                <Styled.FormButton
                    onClick={handleShowSectionModal}
                >
                    <BiLayout/>
                </Styled.FormButton>
                : null
            }
            { !boxHidden ?
                <Styled.FormButton
                    onClick={handleShowBoxModal}
                >
                    <BsBoxSeam/>
                </Styled.FormButton>
                : null
            }
            { !itemHidden ?
            <Styled.FormButton
                onClick={handleShowItemModal}
            >
                <BiFootball/>
            </Styled.FormButton>
                : null
            }

            <SelectBuildingModal
                showModal={showBuildingModal}
                handleCloseModal={handleCloseBuildingModal}
                buildings={buildings}
                BuildingTable={BuildingTable}
                onBuildingClick={onBuildingClick}
            />

            <SelectRoomModal
                showModal={showRoomModal}
                handleCloseModal={handleCloseRoomModal}
                rooms={rooms}
                RoomTable={RoomTable}
                onRoomClick={onRoomClick}
            />

            <SelectFurnitureModal
                showModal={showFurnitureModal}
                handleCloseModal={handleCloseFurnitureModal}
                furnitures={furnitures}
                FurnitureTable={FurnitureTable}
                onFurnitureClick={onFurnitureClick}
            />

            <SelectSectionModal
                showModal={showSectionModal}
                handleCloseModal={handleCloseSectionModal}
                sections={sections}
                SectionTable={SectionTable}
                onSectionClick={onSectionClick}
            />

            <SelectBoxModal
                showModal={showBoxModal}
                handleCloseModal={handleCloseBoxModal}
                boxes={boxes}
                BoxTable={BoxTable}
                onBoxClick={onBoxClick}
            />

            <SelectItemModal
                showModal={showItemModal}
                handleCloseModal={handleCloseItemModal}
                items={items}
                ItemTable={ItemTable}
                onItemClick={onItemClick}
            />
        </div>
    );

};