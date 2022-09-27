import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import BuildingTable from "./components/BuildingTable";
import RoomTable from "../Room/components/RoomTable";
import FurnitureTable from "../Furniture/components/FurnitureTable";
import SectionTable from "../Section/components/SectionTable";
import BoxTable from "../Box/components/BoxTable";

import { dateToString } from "../../../general_components/Functions";
import { handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange } from "../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

import ItemLocationBar from "../../../general_components/ItemLocationBar";

export default function BuildingForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, furnitures, rooms, buildings, addBuilding, updateBuilding] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let buildingData;

  if (data.building === undefined) {
    buildingData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null
    }
  } else {
    buildingData = data.building;
  }

  //get frontend directory
  const history = useNavigate();

  //set building state
  const [building, setBuilding] = useState(buildingData);

  const newLocation = {
    building: {
      buildingId: null,
      name: null
    },
    room: {
      buildingId: null,
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
    if (building.buildingId) {
      updateBuilding(building);
    }
    else { //if item doesn't exist adds new
      addBuilding(building);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={'building'}
      />

      <ItemSelectionBar
        Building={[true, null, null, null]}
        Room={[true, null, null, null]}
        Furniture={[true, null, null, null]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
        remove={[true, null]}
      />

      {/*building name input form*/}
      <InputForm
        value={building.name}
        onChangeField={(e) => handleNameChange(e, setBuilding)}
        placeholder="name..."
        label="name"
      />

      {/*building active input form*/}
      <SwitchForm
        value={building.active}
        onChangeField={(e) => handleActiveChange(e, setBuilding)}
        label={["active", "archived"]}
      />

      {/*building since input form*/}
      <DateForm
        value={building.since}
        onChangeField={(date) => handleSinceChange(date, setBuilding)}
        placeholder="since..."
        label="since"
      />

      {/*building until input form to show only when inactive*/}
      {!building.active ?
        <DateForm
          value={building.until}
          onChangeField={(date) => handleUntilChange(date, setBuilding)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*Change upload button icon wether the it's a new item or an existing item*/}
      <div className="d-inline-flex flex-row align-items-center">
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {building.buildingId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};