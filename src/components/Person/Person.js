import React from 'react';
import { Route, Routes } from "react-router-dom";

//import TransactionForm from "./TransactionForm";
import PersonList from "./PersonList";
import PersonForm from "./PersonForm";
import { Styled } from "../../design/style";

export default function Person() {
  return (
    <div className="container-fluid">

      <div className='row'>

        <div className="col-10 text-start py-3">

          <ul className="nav nav-tabs">
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/people'}>
                People
              </Styled.SecondaryNavBarLink>
            </li>
            <li className="nav-item pe-3">
              <Styled.SecondaryNavBarLink to={'/people/add'}>
                New
              </Styled.SecondaryNavBarLink>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<PersonList/>} />
            <Route path="/add" element={<PersonForm/>} />
            <Route path="/edit/:id" element={<PersonForm/>} />
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