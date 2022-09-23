import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";

//import TransactionForm from "./TransactionForm";
import PersonList from "./PersonList";
import PersonForm from "./PersonForm";
import GiftInfo from "./components/GiftInfo";
import GiftByPersonContext from "../../context/Gift/GiftByPerson/GiftByPersonContext";
import { Styled } from "../../design/style";

export default function Person() {

  const { giftsByPerson, getGiftsByPerson } = useContext(GiftByPersonContext);

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    getGiftsByPerson();

  }, []); //page first rendering dependency

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
            <Route path="/" element={<PersonList />} />
            <Route path="/add" element={<PersonForm />} />
            <Route path="/edit/:id" element={<PersonForm />} />
          </Routes>
        </div>

        <div className="col text-start py-3">
          <Routes>
            <Route path="/edit/:id" element={<GiftInfo GiftsByPerson={giftsByPerson} />} />
          </Routes>
        </div>

      </div>
    </div>
  )
};