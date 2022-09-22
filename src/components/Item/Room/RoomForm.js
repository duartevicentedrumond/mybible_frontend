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
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, onBuildingClick } from "./../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

import ItemLocationBar from "../../../general_components/ItemLocationBar";

export default function RoomForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, furnitures, rooms, addRoom, updateRoom, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let roomData;

  if (data.room === undefined) {
    roomData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null,
      building: null
    }
  } else {
    roomData = data.room;
  }

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [room, setRoom] = useState(roomData);

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

  //saves item and redirects to items list page
  function handleSubmit(e) {

    e.preventDefault();

    //if item already exists updates it
    if (room.roomId) {
      updateRoom(room);
    }
    else { //if item doesn't exist adds new
      addRoom(room);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    if (room.roomId !== undefined) {

      getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        room.roomId,
        'room'
      );
    }

  }, [rooms]); //page first rendering dependency

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={'room'}
      />

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, setRoom, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Room={[true, null, null, null]}
        Furniture={[true, null, null, null]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
        remove={[true, null]}
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