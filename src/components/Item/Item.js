import React, { useState } from 'react';
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
import BuildingView from "./Building/BuildingView";

import { Styled } from "../../design/style";

export default function Item(data) {
  
  const allJoined = data.AllJoined;
  const [items, addItem, updateItem] = data.Items;
  const [boxes, addBox, updateBox] = data.Boxes;
  const [sections, addSection, updateSection] = data.Sections;
  const [furnitures, addFurniture, updateFurniture] = data.Furnitures;
  const [rooms, addRoom, updateRoom] = data.Rooms;
  const [buildings, addBuilding, updateBuilding] = data.Buildings;

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
            <Route
              path="/allItems"
              element={
                <AllJoinedList
                  AllJoined={allJoined}
                />
              }
            />
            <Route
              path="/item"
              element={
                <ItemList
                  Items={items}
                />
              }
            />
            <Route
              path="/box"
              element={
                <BoxList
                  Boxes={boxes}
                />
              }
            />
            <Route
              path="/section"
              element={
                <SectionList
                  Sections={sections}
                />
              }
            />
            <Route
              path="/furniture"
              element={
                <FurnitureList
                  Furnitures={furnitures}
                />
              }
            />
            <Route
              path="/room"
              element={
                <RoomList
                  Rooms={rooms}
                />
              }
            />
            <Route
              path="/building"
              element={
                <BuildingList
                  Buildings={buildings}
                />
              }
            />
            <Route
              path="/item/edit/:id"
              element={
                <ItemView
                  Items={[items, addItem, updateItem]}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                />
              }
            />
            <Route
              path="/box/edit/:id"
              element={
                <BoxView
                  Items={items}
                  Boxes={[boxes, addBox, updateBox]}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                />
              } 
            />
            <Route
              path="/section/edit/:id"
              element={
                <SectionView
                  Items={items}
                  Boxes={boxes}
                  Sections={[sections, addSection, updateSection]}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                />
              } 
            />
            <Route
              path="/furniture/edit/:id"
              element={
                <FurnitureView
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={[furnitures, addFurniture, updateFurniture]}
                  Rooms={rooms}
                  Buildings={buildings}
                />
              } 
            />
            <Route
              path="/room/edit/:id"
              element={
                <RoomView
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={[rooms, addRoom, updateRoom]}
                  Buildings={buildings}
                />
              } 
            />
            <Route
              path="/building/edit/:id"
              element={
                <BuildingView
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={[buildings, addBuilding, updateBuilding]}
                />
              } 
            />
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
          Items={[items, addItem, updateItem]}
          Boxes={[boxes, addBox, updateBox]}
          Sections={[sections, addSection, updateSection]}
          Furnitures={[furnitures, addFurniture, updateFurniture]}
          Rooms={[rooms, addRoom, updateRoom]}
          Buildings={[buildings, addBuilding, updateBuilding]}
        />

      </div>
    </div>
  )
};