import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import BuildingTable from "../Building/components/BuildingTable";
import RoomTable from "../Room/components/RoomTable";
import FurnitureTable from "../Furniture/components/FurnitureTable";
import SectionTable from "../Section/components/SectionTable";
import BoxTable from "../Box/components/BoxTable";

import { dateToString } from "./../../../general_components/Functions";
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, handleBuildingChange, handleRoomChange, handleFurnitureChange, handleSectionChange, handleBoxChange } from "./../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

export default function BoxForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, addBox, updateBox, sections, furnitures, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [box, setBox] = useState({
    name: null,
    active: true,
    since: dateToString(new Date()),
    until: null,
    building: null,
    room: null,
    furniture: null,
    section: null
  });

  const newLocation = {
    building: {
      buildingId: null,
      name: null
    },
    room: {
      roomId: null,
      name: null
    },
    furniture: {
      furnitureId: null,
      name: null
    },
    section: {
      sectionId: null,
      name: null
    },
    box: {
      boxId: null,
      name: null
    }
  }

  const [location, setLocation] = useState(newLocation);

  //udpate item state when until input changes
  function onBuildingClick(e) {

    //prevent page refresh
    e.preventDefault();

    const buildingId = e.target.dataset.buildingid;
    handleBuildingChange(buildingId, setBox);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], buildingId, 'building');
  };

  //udpate item state when room input changes
  function onRoomClick(e) {

    //prevent page refresh
    e.preventDefault();

    const roomId = e.target.dataset.roomid;
    handleRoomChange(roomId, setBox);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], roomId, 'room');
  };

  //udpate item state when furniture input changes
  function onFurnitureClick(e) {

    //prevent page refresh
    e.preventDefault();

    const furnitureId = e.target.dataset.furnitureid;
    handleFurnitureChange(furnitureId, setBox);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], furnitureId, 'furniture');
  };

  //udpate item state when section input changes
  function onSectionClick(e) {

    //prevent page refresh
    e.preventDefault();

    const sectionId = e.target.dataset.sectionid;
    handleSectionChange(sectionId, setBox);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], sectionId, 'section');
  };

  //saves item and redirects to items list page
  function handleSubmit(e) {

    e.preventDefault();

    //if item already exists updates it
    if (box.boxId) {
      updateBox(box);
    }
    else { //if item doesn't exist adds new
      addBox(box);
    }

    handleCloseModal();

    //redirects to transactions list page
    history("/item/AllItems");
  };

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, onBuildingClick]}
        Room={[false, RoomTable, rooms, onRoomClick]}
        Furniture={[false, FurnitureTable, furnitures, onFurnitureClick]}
        Section={[false, SectionTable, sections, onSectionClick]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
      />

      {/*box name input form*/}
      <InputForm
        value={box.name}
        onChangeField={(e) => handleNameChange(e, setBox)}
        placeholder="name..."
        label="name"
      />

      {/*box active input form*/}
      <SwitchForm
        value={box.active}
        onChangeField={(e) => handleActiveChange(e, setBox)}
        label="active"
      />

      {/*box since input form*/}
      <DateForm
        value={box.since}
        onChangeField={(date) => handleSinceChange(date, setBox)}
        placeholder="since..."
        label="since"
      />

      {/*box until input form to show only when inactive*/}
      {!box.active ?
        <DateForm
          value={box.until}
          onChangeField={(date) => handleUntilChange(date, setBox)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*item building input form to show only when exists*/}
      {location.building.buildingId !== null ?
        <InputForm
          value={location.building.name}
          placeholder="building..."
          label="building"
        />
        : null
      }

      {/*item room input form to show only when exists*/}
      {location.room.roomId !== null ?
        <InputForm
          value={location.room.name}
          placeholder="room..."
          label="room"
        />
        : null
      }

      {/*item furniture input form to show only when exists*/}
      {location.furniture.furnitureId !== null ?
        <InputForm
          value={location.furniture.name}
          placeholder="furniture..."
          label="furniture"
        />
        : null
      }

      {/*item section input form to show only when exists*/}
      {location.section.sectionId !== null ?
        <InputForm
          value={location.section.name}
          placeholder="section..."
          label="section"
        />
        : null
      }

      {/*item box input form to show only when exists*/}
      {location.box.boxId !== null ?
        <InputForm
          value={location.box.name}
          placeholder="box..."
          label="box"
        />
        : null
      }

      {/*Change upload button icon wether the it's a new item or an existing item*/}
      <div className="d-inline-flex flex-row align-items-center">
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {box.boxId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};