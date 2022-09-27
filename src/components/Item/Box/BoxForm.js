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
import { getLocation, handleNameChange, handleActiveChange, handleSinceChange, handleUntilChange, onBuildingClick, onRoomClick, onFurnitureClick, onSectionClick, onBoxClick } from "./../../../general_components/ItemFunctions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";
import ItemLocationBar from "../../../general_components/ItemLocationBar";

export default function BoxForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, boxes, addBox, updateBox, sections, furnitures, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let boxData;

  if (data.box === undefined) {
    boxData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null,
      building: null,
      room: null,
      furniture: null,
      section: null
    }
  } else {
    boxData = data.box;
  }

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [box, setBox] = useState(boxData);

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
    if (box.boxId) {
      updateBox(box);
    }
    else { //if item doesn't exist adds new
      addBox(box);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    if (box.boxId !== undefined) {

      getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        box.boxId,
        'box'
      );
    }

  }, [boxes]); //page first rendering dependency

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={'box'}
      />

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, setBox, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Room={[false, RoomTable, rooms, (e) => onRoomClick(e, setBox, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Furniture={[false, FurnitureTable, furnitures, (e) => onFurnitureClick(e, setBox, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Section={[false, SectionTable, sections, (e) => onSectionClick(e, setBox, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Box={[true, null, null, null]}
        Item={[true, null, null, null]}
        remove={[true, null]}
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
        label={["active", "archived"]}
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