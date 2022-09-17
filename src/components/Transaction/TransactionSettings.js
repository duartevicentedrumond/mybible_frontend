import React, { useState, useContext, useEffect } from 'react';

import { Styled } from "../../design/style";
import { RiParentLine, RiHashtag } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";

import SettingsTypesModal from "./Components/SettingsTypesModal";
import TypeContext from "../../context/Wallet/Type/TypeContext";

export default function TransactionSettings() {

  //get context for getTypes function and types object
  const { types, getTypes, updateType } = useContext(TypeContext);

  const [settingsTypes, setSettingsTypes] = useState([
    {
      typeId: null,
      description: null,
      status: true
    }
  ]);

  //run on the first render and anytime any dependency value changes
  useEffect(
    () => {

      //get all existing types for dropdown input
      getTypes();

    }
  , []); //page first rendering depends on 

  //define states and variables for types modal form

    //set state for showTypesModal
    const [showTypesModal, setShowTypesModal] = useState(false);

    //set functions to handle state change
    function handleShowTypesModal(e) {

      e.preventDefault();
      setSettingsTypes(types);

      setShowTypesModal(true);

    };

    function handleCloseTypesModal() {
      setShowTypesModal(false);

      settingsTypes.map( (type) => {
        updateType(type)
      } );

    };

  return (
    <div class="container text-center py-3 px-0">

      <div class="row">
        <Styled.SettingsLink 
          class="col"
          to={`#`}
          onClick={handleShowTypesModal}
        >
          Types
        </Styled.SettingsLink>
        <div class="col">
          Category
        </div>
      </div>

      <SettingsTypesModal
        showModal={showTypesModal}
        handleCloseModal={handleCloseTypesModal}
        types={types}
        state={[settingsTypes, setSettingsTypes]}
      />

    </div>
  )
};