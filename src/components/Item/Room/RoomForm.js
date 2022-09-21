import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import BuildingTable from "../Building/components/BuildingTable";
import RoomTable from "./components/RoomTable";
import FurnitureTable from "../Furniture/components/FurnitureTable";
import SectionTable from "../Section/components/SectionTable";
import BoxTable from "../Box/components/BoxTable";

import { dateToString } from "../../../general_components/Functions";
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, handleBuildingChange, handleRoomChange, handleFurnitureChange, handleSectionChange, handleBoxChange } from "../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

export default function RoomForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, furnitures, rooms, addRoom, updateRoom, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [room, setRoom] = useState({
    name: null,
    active: true,
    since: dateToString(new Date()),
    until: null,
    building: null
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
    handleBuildingChange(buildingId, setRoom);
    setLocation(newLocation);
    getLocation([location, setLocation], [buildings, rooms, furnitures, sections, boxes, items], buildingId, 'building');
  };

  //saves item and redirects to items list page
  function handleSubmit(e) {

    e.preventDefault();

    //if item already exists updates it
    if (room.roomId) {
      updateRoom(room);
    }
    else { //if item doesn't exist adds new
      addRoom(room);
    }

    handleCloseModal();

    //redirects to transactions list page
    history("/item/AllItems");
  };

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, onBuildingClick]}
        Room={[true, null, null, null]}
        Furniture={[true, null, null, null]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
      />

      {/*room name input form*/}
      <InputForm
        value={room.name}
        onChangeField={(e) => handleNameChange(e, setRoom)}
        placeholder="name..."
        label="name"
      />

      {/*room active input form*/}
      <SwitchForm
        value={room.active}
        onChangeField={(e) => handleActiveChange(e, setRoom)}
        label="active"
      />

      {/*room since input form*/}
      <DateForm
        value={room.since}
        onChangeField={(date) => handleSinceChange(date, setRoom)}
        placeholder="since..."
        label="since"
      />

      {/*room until input form to show only when inactive*/}
      {!room.active ?
        <DateForm
          value={room.until}
          onChangeField={(date) => handleUntilChange(date, setRoom)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*room building input form to show only when exists*/}
      {location.building.buildingId !== null ?
        <InputForm
          value={location.building.name}
          placeholder="building..."
          label="building"
        />
        : null
      }

      {/*room room input form to show only when exists*/}
      {location.room.roomId !== null ?
        <InputForm
          value={location.room.name}
          placeholder="room..."
          label="room"
        />
        : null
      }

      {/*room furniture input form to show only when exists*/}
      {location.furniture.furnitureId !== null ?
        <InputForm
          value={location.furniture.name}
          placeholder="furniture..."
          label="furniture"
        />
        : null
      }

      {/*room section input form to show only when exists*/}
      {location.section.sectionId !== null ?
        <InputForm
          value={location.section.name}
          placeholder="section..."
          label="section"
        />
        : null
      }

      {/*room box input form to show only when exists*/}
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
          {room.roomId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};