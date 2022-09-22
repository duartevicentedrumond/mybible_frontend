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
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, onBuildingClick, onRoomClick, onFurnitureClick, onSectionClick, onBoxClick } from "./../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

import ItemLocationBar from "../../../general_components/ItemLocationBar";

export default function FurnitureForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, furnitures, addFurniture, updateFurniture, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let furnitureData;

  if (data.furniture === undefined) {
    furnitureData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null,
      building: null,
      room: null
    }
  } else {
    furnitureData = data.furniture;
  }

  //get frontend directory
  const history = useNavigate();

  //set furniture state
  const [furniture, setFurniture] = useState(furnitureData);

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

  //saves furniture and redirects to furnitures list page
  function handleSubmit(e) {

    e.preventDefault();

    //if furniture already exists updates it
    if (furniture.furnitureId) {
      updateFurniture(furniture);
    }
    else { //if furniture doesn't exist adds new
      addFurniture(furniture);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    if (furniture.furnitureId !== undefined) {

      getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        furniture.furnitureId,
        'furniture'
      );
    }

  }, [furnitures]); //page first rendering dependency

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={'furniture'}
      />

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, setFurniture, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Room={[false, RoomTable, rooms, (e) => onRoomClick(e, setFurniture, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Furniture={[true, null, null, null]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
        remove={[true, null]}
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