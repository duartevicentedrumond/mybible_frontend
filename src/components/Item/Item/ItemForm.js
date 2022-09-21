import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { Styled } from "../../../design/style";
import { IoAdd, IoSync } from "react-icons/io5";
import { RiParentLine, RiHashtag } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";

import { dateToString } from "./../../../general_components/Functions";
import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";

export default function ItemForm() {

  //set item state
  const [item, setItem] = useState({
    name: null,
    active: true,
    since: dateToString(new Date()),
    until: null,
    buildingId: null,
    roomId: null,
    furnitureId: null,
    sectionId: null,
    boxId: null
  });
    
  //define handle item input changes

    //udpate item state when name input changes
    function handleNameChange(e) {
      setItem(existingItem => ({
        ...existingItem,
        name: e.target.value
      }));
    };

  return (
    <div className="d-flex flex-column text-start py-3 px-0">
      
      {/*item name input form*/}
      <InputForm
        value={item.name}
        onChangeField={handleNameChange}
        placeholder="name..."
        label="name"
      />

      {/*item active input form*/}
      <SwitchForm
        value={item.active}
        onChangeField={handleNameChange}
        label="active"
      />

    </div>
  )
};