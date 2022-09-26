import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";

//import TransactionForm from "./TransactionForm";
import PersonList from "./PersonList";
import PersonForm from "./PersonForm";
import GiftInfo from "./components/GiftInfo";

import { Styled } from "../../design/style";

export default function Person(data) {

  const [people, addPerson, updatePerson, deletePerson, getPeople] = data.People;
  const items = data.Items;
  const boxes = data.Boxes;
  const sections = data.Sections;
  const furnitures = data.Furnitures;
  const rooms = data.Rooms;
  const buildings = data.Buildings;
  const gifttypes = data.Gifttypes;
  const subtransactionsByTransaction = data.Transactions;
  const [addGift, updateGift, giftsByPerson, getGiftsByPerson] = data.Gifts;

  //Execute getTransactions function as soon as the page is rendered
  useEffect(
    () => {
        getPeople();
        getGiftsByPerson();
    }
  , []);

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
            <Route
              path="/"
              element={
                <PersonList
                  People={[people, getPeople]}
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                  Gifttypes={gifttypes}
                  Transactions={subtransactionsByTransaction}
                  Gifts={getGiftsByPerson}
                />
              }
            />
            <Route
              path="/add"
              element={
                <PersonForm
                  People={[people, addPerson, updatePerson, deletePerson]}
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                  Gifttypes={gifttypes}
                  Transactions={subtransactionsByTransaction}
                  Gifts={[addGift, updateGift]}
                />
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PersonForm
                  People={[people, addPerson, updatePerson, deletePerson]}
                  Items={items}
                  Boxes={boxes}
                  Sections={sections}
                  Furnitures={furnitures}
                  Rooms={rooms}
                  Buildings={buildings}
                  Gifttypes={gifttypes}
                  Transactions={subtransactionsByTransaction}
                  Gifts={[addGift, updateGift]}
                />
              }
            />
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