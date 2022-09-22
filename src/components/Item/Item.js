import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import ItemList from "./Item/ItemList";
import AllJoinedList from "./AllJoined/AllJoinedList";
import BoxList from "./Box/BoxList";
import SectionList from "./Section/SectionList";
import FurnitureList from "./Furniture/FurnitureList";
import RoomList from "./Room/RoomList";
import BuildingList from "./Building/BuildingList";
import AddItemModal from "./AddItemModal";
import ItemView from "./Item/ItemView";
import BoxView from "./Box/BoxView";
import SectionView from "./Section/SectionView";
import FurnitureView from "./Furniture/FurnitureView";
import RoomView from "./Room/RoomView";

import { Styled } from "../../design/style";

export default function Item() {

    //define states and variables for types modal form

    //set state for showNewModal
    const [showNewModal, setShowNewModal] = useState(false);

    //set functions to handle state change
    function handleShowNewModal(e) {

      e.preventDefault();

      setShowNewModal(true);
    };

    function handleCloseNewModal() {
      setShowNewModal(false);
    };

  return (
    <div className="container-fluid">

      <div className='row'>

        <div className="col-10 text-start py-3">

          <ul className="nav nav-tabs">
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/allItems'}>
                All
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/item'}>
                Items
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/box'}>
                Boxes
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/section'}>
                Sections
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/furniture'}>
                Furnitures
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/room'}>
                Rooms
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/building'}>
                Buildings
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink 
                to='#'
                onClick={handleShowNewModal}
              >
                New
              </Styled.SecondaryNavBarLink>
            </li>
          </ul>

          <Routes>
            <Route path="/allItems" element={<AllJoinedList/>} />
            <Route path="/item" element={<ItemList/>} />
            <Route path="/box" element={<BoxList/>} />
            <Route path="/section" element={<SectionList/>} />
            <Route path="/furniture" element={<FurnitureList/>} />
            <Route path="/room" element={<RoomList/>} />
            <Route path="/building" element={<BuildingList/>} />
            <Route path="/item/edit/:id" element={<ItemView/>} />
            <Route path="/box/edit/:id" element={<BoxView/>} />
            <Route path="/section/edit/:id" element={<SectionView/>} />
            <Route path="/furniture/edit/:id" element={<FurnitureView/>} />
            <Route path="/room/edit/:id" element={<RoomView/>} />
          </Routes> 
        </div>
          
        <div className="col text-start py-3">
          <Routes>
          </Routes>
        </div>

        {/*new item/box/section/furniture/room/building modal input form*/}
        <AddItemModal
          showModal={showNewModal}
          handleCloseModal={handleCloseNewModal}
        />

      </div>
    </div>
  )
};