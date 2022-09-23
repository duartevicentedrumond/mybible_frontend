import './App.css';

import React from 'react';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from "./general_components/Home";
import { TransactionContextProvider } from "./context/Wallet/Transaction/TransactionState";
import { CategoryContextProvider } from "./context/Wallet/Category/CategoryState";
import { TypeContextProvider } from "./context/Wallet/Type/TypeState";
import { CategorySumContextProvider } from "./context/Wallet/CategorySum/CategorySumState";
import { MonthSumContextProvider } from "./context/Wallet/MonthSum/MonthSumState";
import { PersonContextProvider } from "./context/Person/Person/PersonState";
import { DebtSumContextProvider } from "./context/Wallet/DebtSum/DebtSumState";
import { ItemsContextProvider } from "./context/Item/Item/ItemState";
import { AllJoinedContextProvider } from "./context/Item/AllJoined/AllJoinedState";
import { BoxesContextProvider } from "./context/Item/Box/BoxState";
import { SectionsContextProvider } from "./context/Item/Section/SectionState";
import { FurnituresContextProvider } from "./context/Item/Furniture/FurnitureState";
import { RoomsContextProvider } from "./context/Item/Room/RoomState";
import { BuildingsContextProvider } from "./context/Item/Building/BuildingState";
import { GiftContextProvider } from "./context/Gift/Gift/GiftState";
import { GifttypeContextProvider } from "./context/Gift/Gifttype/GifttypeState";
import { GiftByPersonContextProvider } from "./context/Gift/GiftByPerson/GiftByPersonState";

function App() {
  return (
    <div className="App">

      <TransactionContextProvider>
        <CategoryContextProvider>
          <TypeContextProvider>
            <CategorySumContextProvider>
              <MonthSumContextProvider>
                <BuildingsContextProvider>
                  <RoomsContextProvider>
                    <FurnituresContextProvider>
                      <SectionsContextProvider>
                        <BoxesContextProvider>
                          <ItemsContextProvider>
                            <AllJoinedContextProvider>
                              <PersonContextProvider>
                                <DebtSumContextProvider>
                                  <GiftContextProvider>
                                    <GifttypeContextProvider>
                                      <GiftByPersonContextProvider>
                                        <BrowserRouter>
                                          <Routes>

                                            {/* Route for home page which has subpages*/}
                                            <Route path="/*" element={<Home />} />

                                          </Routes>
                                        </BrowserRouter>
                                      </GiftByPersonContextProvider>
                                    </GifttypeContextProvider>
                                  </GiftContextProvider>
                                </DebtSumContextProvider>
                              </PersonContextProvider>
                            </AllJoinedContextProvider>
                          </ItemsContextProvider>
                        </BoxesContextProvider>
                      </SectionsContextProvider>
                    </FurnituresContextProvider>
                  </RoomsContextProvider>
                </BuildingsContextProvider>
              </MonthSumContextProvider>
            </CategorySumContextProvider>
          </TypeContextProvider>
        </CategoryContextProvider>
      </TransactionContextProvider>

    </div>
  );
}

export default App;