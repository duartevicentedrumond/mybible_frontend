import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import BuildingTable from "../Building/components/BuildingTable";
import RoomTable from "../Room/components/RoomTable";
import FurnitureTable from "./components/FurnitureTable";
import SectionTable from "../Section/components/SectionTable";
import BoxTable from "../Box/components/BoxTable";

import { dateToString } from "../../../general_components/Functions";
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, handleBuildingChange, handleRoomChange, handleFurnitureChange, handleSectionChange, handleBoxChange } from "../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

export default function FurnitureForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, furnitures, addFurniture, updateFurniture, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;

  //get frontend directory
  const history = useNavigate();

  //set furniture state
  const [furniture, setFurniture] = useState({
    name: null,
    active: true,
    since: dateToString(new Date()),
    until: null,
    building: null,
    room: null
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

  //udpate furniture state when until input changes
  function onBuildingClick(e) {

    //prevent page refresh
    e.preventDefault();

    const buildingId = e.target.dataset.buildingid;
    handleBuildingChange(buildingId, setFurniture);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], buildingId, 'building');
  };

  //udpate furniture state when room input changes
  function onRoomClick(e) {

    //prevent page refresh
    e.preventDefault();

    const roomId = e.target.dataset.roomid;
    handleRoomChange(roomId, setFurniture);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], roomId, 'room');
  };

  //saves furniture and redirects to furnitures list page
  function handleSubmit(e) {

    e.preventDefault();

    //if furniture already exists updates it
    if (furniture.furnitureId) {
      updateFurniture(furniture);
    }
    else { //if furniture doesn't exist adds new
      addFurniture(furniture);
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
        Furniture={[true, null, null, null]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
      />

      {/*furniture name input form*/}
      <InputForm
        value={furniture.name}
        onChangeField={(e) => handleNameChange(e, setFurniture)}
        placeholder="name..."
        label="name"
      />

      {/*furniture active input form*/}
      <SwitchForm
        value={furniture.active}
        onChangeField={(e) => handleActiveChange(e, setFurniture)}
        label="active"
      />

      {/*furniture since input form*/}
      <DateForm
        value={furniture.since}
        onChangeField={(date) => handleSinceChange(date, setFurniture)}
        placeholder="since..."
        label="since"
      />

      {/*furniture until input form to show only when inactive*/}
      {!furniture.active ?
        <DateForm
          value={furniture.until}
          onChangeField={(date) => handleUntilChange(date, setFurniture)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*furniture building input form to show only when exists*/}
      {location.building.buildingId !== null ?
        <InputForm
          value={location.building.name}
          placeholder="building..."
          label="building"
        />
        : null
      }

      {/*furniture room input form to show only when exists*/}
      {location.room.roomId !== null ?
        <InputForm
          value={location.room.name}
          placeholder="room..."
          label="room"
        />
        : null
      }

      {/*furniture furniture input form to show only when exists*/}
      {location.furniture.furnitureId !== null ?
        <InputForm
          value={location.furniture.name}
          placeholder="furniture..."
          label="furniture"
        />
        : null
      }

      {/*furniture section input form to show only when exists*/}
      {location.section.sectionId !== null ?
        <InputForm
          value={location.section.name}
          placeholder="section..."
          label="section"
        />
        : null
      }

      {/*furniture box input form to show only when exists*/}
      {location.box.boxId !== null ?
        <InputForm
          value={location.box.name}
          placeholder="box..."
          label="box"
        />
        : null
      }

      {/*Change upload button icon wether the it's a new furniture or an existing furniture*/}
      <div className="d-inline-flex flex-row align-items-center">
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {furniture.furnitureId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};