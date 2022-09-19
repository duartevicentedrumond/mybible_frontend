import React, { useState, useContext, useEffect } from 'react';

import { Styled } from "../../design/style";
import { RiParentLine, RiHashtag } from "react-icons/ri";
import { TiFlowChildren } from "react-icons/ti";
import { FiTrash2 } from "react-icons/fi";

import SettingsTypesModal from "./Components/SettingsTypesModal";
import SettingsCategoriesModal from "./Components/SettingsCategoriesModal";
import TypeContext from "../../context/Wallet/Type/TypeContext";
import CategoryContext from "../../context/Wallet/Category/CategoryContext";

export default function TransactionSettings() {

  //get context for getTypes and updateType functions and types object
  const { types, getTypes, updateType } = useContext(TypeContext);

  //get context for getCategories and updateCategories functions and categories object
  const { categories, getCategories, updateCategory } = useContext(CategoryContext);

  const [settingsTypes, setSettingsTypes] = useState([
    {
      typeId: null,
      description: null,
      active: true
    }
  ]);

  const [settingsCategories, setSettingsCategories] = useState([
    {
      categoryId: null,
      description: null,
      active: true
    }
  ]);

  //run on the first render and anytime any dependency value changes
  useEffect(
    () => {

      //get all existing types
      getTypes();

      //get all existing categories
      getCategories();

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

  //define states and variables for categories modal form

    //set state for showTypesModal
    const [showCategoriesModal, setShowCategoriesModal] = useState(false);

    //set functions to handle state change
    function handleShowCategoriesModal(e) {

      e.preventDefault();
      setSettingsCategories(categories);

      setShowCategoriesModal(true);

    };

    function handleCloseCategoriesModal() {
      setShowCategoriesModal(false);

      settingsCategories.map( (category) => {
        updateCategory(category)
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
        <Styled.SettingsLink 
          class="col"
          to={`#`}
          onClick={handleShowCategoriesModal}
        >
          Categories
        </Styled.SettingsLink>
      </div>

      <SettingsTypesModal
        showModal={showTypesModal}
        handleCloseModal={handleCloseTypesModal}
        types={types}
        state={[settingsTypes, setSettingsTypes]}
      />

      <SettingsCategoriesModal
        showModal={showCategoriesModal}
        handleCloseModal={handleCloseCategoriesModal}
        categories={categories}
        state={[settingsCategories, setSettingsCategories]}
      />

    </div>
  )
};