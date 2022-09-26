import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

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

export default function ItemForm(data) {

  //get items, boxes, sections, furniture, rooms and buildings
  const [items, addItem, updateItem, boxes, sections, furnitures, rooms, buildings] = data.items;

  const handleCloseModal = data.handleCloseModal;
  let itemData;

  if (data.item === undefined) {
    itemData = {
      name: null,
      active: true,
      since: dateToString(new Date()),
      until: null,
      building: null,
      room: null,
      furniture: null,
      section: null,
      box: null
    }
  } else {
    itemData = data.item;
  }

  //get frontend directory
  const history = useNavigate();

  //set item state
  const [item, setItem] = useState(itemData);

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
    if (item.itemId) {
      updateItem(item);
    }
    else { //if item doesn't exist adds new
      addItem(item);
      handleCloseModal();
    }

    //redirects to transactions list page
    history("/item/AllItems");
  };

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    if (item.itemId !== undefined) {

      getLocation(
        [location, setLocation],
        [buildings, rooms, furnitures, sections, boxes, items],
        item.itemId,
        'item'
      );
    }

  }, [items]); //page first rendering dependency

  return (
    <div className="d-flex flex-column text-start pb-3 px-0">

      <ItemLocationBar
        location={location}
        type={"item"}
      />

      <ItemSelectionBar
        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Room={[false, RoomTable, rooms, (e) => onRoomClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Furniture={[false, FurnitureTable, furnitures, (e) => onFurnitureClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Section={[false, SectionTable, sections, (e) => onSectionClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Box={[false, BoxTable, boxes, (e) => onBoxClick(e, setItem, [newLocation, location, setLocation], [buildings, rooms, furnitures, sections, boxes, items])]}
        Item={[true, null, null, null]}
        remove={[true, null]}
      />

      {/*item name input form*/}
      <InputForm
        value={item.name}
        onChangeField={(e) => handleNameChange(e, setItem)}
        placeholder="name..."
        label="name"
      />

      {/*item active input form*/}
      <SwitchForm
        value={item.active}
        onChangeField={(e) => handleActiveChange(e, setItem)}
        label="active"
      />

      {/*item since input form*/}
      <DateForm
        value={item.since}
        onChangeField={(date) => handleSinceChange(date, setItem)}
        placeholder="since..."
        label="since"
      />

      {/*item until input form to show only when inactive*/}
      {!item.active ?
        <DateForm
          value={item.until}
          onChangeField={(date) => handleUntilChange(date, setItem)}
          placeholder="until..."
          label="until"
        />
        : null
      }

      {/*Change upload button icon wether the it's a new item or an existing item*/}
      <div className="d-inline-flex flex-row align-items-center">
        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
          {item.itemId ?
            <IoSync /> :
            <IoAdd />
          }
        </Styled.TitleButton>
      </div>

    </div>
  )
};