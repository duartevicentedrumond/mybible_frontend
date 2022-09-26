import React, { useContext, useEffect } from 'react';

import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Transaction from "../components/Transaction/Transaction";
import Person from "../components/Person/Person";
import Item from "../components/Item/Item";   

import TransactionContext from "../context/Wallet/Transaction/TransactionContext";
import PersonContext from "../context/Person/Person/PersonContext";
import GiftByPersonContext from "../context/Gift/GiftByPerson/GiftByPersonContext";
import ItemContex from "../context/Item/Item/ItemContext";
import BoxContext from "../context/Item/Box/BoxContext";
import SectionContext from "../context/Item/Section/SectionContext";
import FurnitureContext from "../context/Item/Furniture/FurnitureContext";
import RoomContext from "../context/Item/Room/RoomContext";
import BuildingContext from "../context/Item/Building/BuildingContext";
import GifttypeContext from "../context/Gift/Gifttype/GifttypeContext";
import GiftContext from "../context/Gift/Gift/GiftContext";

const Home = () => {

  const { transactions, categoriesSum, debtsSum, getTransactions, subtransactionsByTransaction, getSubtransactionsByTransaction, getCategoriesSum, getDebtsSum } = useContext(TransactionContext);
  const { addPerson, people, updatePerson, deletePerson, getPeople } = useContext(PersonContext);
  const { items, getItems } = useContext(ItemContex);
  const { boxes, getBoxes } = useContext(BoxContext);
  const { sections, getSections } = useContext(SectionContext);
  const { furnitures, getFurnitures } = useContext(FurnitureContext);
  const { rooms, getRooms } = useContext(RoomContext);
  const { buildings, getBuildings } = useContext(BuildingContext);
  const { gifttypes, getGifttypes } = useContext(GifttypeContext);
  const { giftsByPerson, getGiftsByPerson } = useContext(GiftByPersonContext);
  const { addGift, updateGift } = useContext(GiftContext);

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    getTransactions();
    getCategoriesSum();
    getSubtransactionsByTransaction();
    getDebtsSum();
    getPeople();
    getItems();
    getBoxes();
    getSections();
    getFurnitures();
    getRooms();
    getBuildings();
    getGifttypes();
    getGiftsByPerson();

  }, []); //page first rendering dependency

  return (
    <div>

        <NavBar/>

        <div className='px-5 pt-3'>
          <Routes>
          
              {/* Route for 'transaction' page which has subpages*/}
              <Route
                path="transaction/*"
                element={
                  <Transaction
                    Transactions={[transactions, categoriesSum, debtsSum]}
                  />
                }
              />

              {/* Route for 'person' page which has subpages*/}
              <Route
                path="people/*"
                element={
                  <Person
                    People={[people, addPerson, updatePerson, deletePerson]}
                    Items={items}
                    Boxes={boxes}
                    Sections={sections}
                    Furnitures={furnitures}
                    Rooms={rooms}
                    Buildings={buildings}
                    Gifttypes={gifttypes}
                    Transactions={subtransactionsByTransaction}
                    Gifts={[addGift, updateGift, giftsByPerson]}
                  />
                }
              />

              {/* Route for 'item' page which has subpages*/}
              <Route path="item/*" element={<Item/>} />

          </Routes>
        </div>
    </div>
  )
}

export default Home