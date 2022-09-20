import React, { useContext, useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import ItemList from "./Item/ItemList";
import AllJoinedList from "./AllJoined/AllJoinedList";
import { Styled } from "../../design/style";

export default function Item() {

  return (
    <div className="container-fluid">

      <div className='row'>

        <div className="col-10 text-start py-3">

          <ul className="nav nav-tabs">
          <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item'}>
                All
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/item'}>
                Items
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/item/add'}>
                New
              </Styled.SecondaryNavBarLink>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<AllJoinedList/>} />
            <Route path="item" element={<ItemList/>} />
          </Routes> 
        </div>
          
        <div className="col text-start py-3">
          <Routes>
          </Routes>
        </div>

      </div>
    </div>
  )
};