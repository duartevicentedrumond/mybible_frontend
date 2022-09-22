import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";

import BuildingTable from "../Building/components/BuildingTable";
import RoomTable from "../Room/components/RoomTable";
import FurnitureTable from "../Furniture/components/FurnitureTable";
import SectionTable from "./components/SectionTable";
import BoxTable from "../Box/components/BoxTable";

import { dateToString } from "../../../general_components/Functions";
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, onBuildingClick, onRoomClick, onFurnitureClick, onSectionClick, onBoxClick } from "./../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";

import ItemLocationBar from "../../../general_components/ItemLocationBar";

export default function SectionForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, sections, addSection, updateSection, furnitures, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let sectionData;

  if (data.section === undefined) {
    sectionData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null,
      building: null,
      room: null,
      furniture: null
    }
  } else {
    sectionData = data.section;
  }

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [section, setSection] = useState(sectionData);

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
    if (section.sectionId) {
      updateSection(section);
    }
    else { //if item doesn't exist adds new
      addSection(section);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    if (section.sectionId !== undefined) {

      getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        section.sectionId,
        'section'
      );
    }

  }, [sections]); //page first rendering dependency

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={'section'}
      />

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, setSection, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Room={[false, RoomTable, rooms, (e) => onRoomClick(e, setSection, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Furniture={[false, FurnitureTable, furnitures, (e) => onFurnitureClick(e, setSection, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Section={[true, null, null, null]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
      />

      {/*section name input form*/}
      <InputForm
        value={section.name}
        onChangeField={(e) => handleNameChange(e, setSection)}
        placeholder="name..."
        label="name"
      />

      {/*section active input form*/}
      <SwitchForm
        value={section.active}
        onChangeField={(e) => handleActiveChange(e, setSection)}
        label="active"
      />

      {/*section since input form*/}
      <DateForm
        value={section.since}
        onChangeField={(date) => handleSinceChange(date, setSection)}
        placeholder="since..."
        label="since"
      />

      {/*section until input form to show only when inactive*/}
      {!section.active ?
        <DateForm
          value={section.until}
          onChangeField={(date) => handleUntilChange(date, setSection)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*Change upload button icon wether the it's a new item or an existing item*/}
      <div className="d-inline-flex flex-row align-items-center">
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {section.sectionId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};