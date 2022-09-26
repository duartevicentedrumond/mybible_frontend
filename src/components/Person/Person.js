import React, { useEffect, useContext } from 'react';
import { Route, Routes } from "react-router-dom";

//import TransactionForm from "./TransactionForm";
import PersonList from "./PersonList";
import PersonForm from "./PersonForm";
import GiftInfo from "./components/GiftInfo";
import PersonContext from "../../context/Person/Person/PersonContext";
import GiftByPersonContext from "../../context/Gift/GiftByPerson/GiftByPersonContext";
import ItemContex from "./../../context/Item/Item/ItemContext";
import BoxContext from "./../../context/Item/Box/BoxContext";
import SectionContext from "./../../context/Item/Section/SectionContext";
import FurnitureContext from "./../../context/Item/Furniture/FurnitureContext";
import RoomContext from "./../../context/Item/Room/RoomContext";
import BuildingContext from "./../../context/Item/Building/BuildingContext";
import TransactionContext from "./../../context/Wallet/Transaction/TransactionContext";
import GifttypeContext from "./../../context/Gift/Gifttype/GifttypeContext";
import GiftContext from "./../../context/Gift/Gift/GiftContext";
import { Styled } from "../../design/style";

export default function Person() {

  const { addPerson, people, updatePerson, deletePerson, getPeople } = useContext(PersonContext);
  const { items, getItems } = useContext(ItemContex);
  const { boxes, getBoxes } = useContext(BoxContext);
  const { sections, getSections } = useContext(SectionContext);
  const { furnitures, getFurnitures } = useContext(FurnitureContext);
  const { rooms, getRooms } = useContext(RoomContext);
  const { buildings, getBuildings } = useContext(BuildingContext);
  const { transactions, getTransactions } = useContext(TransactionContext);
  const { gifttypes, getGifttypes } = useContext(GifttypeContext);
  const { giftsByPerson, getGiftsByPerson } = useContext(GiftByPersonContext);
  const { addGift, updateGift } = useContext(GiftContext);

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    getPeople();
    getItems();
    getBoxes();
    getSections();
    getFurnitures();
    getRooms();
    getBuildings();
    getTransactions();
    getGifttypes();
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
                  Transactions={transactions}
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
                  Transactions={transactions}
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