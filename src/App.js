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

function App() {
  return (
    <div className="App">

      <TransactionContextProvider>
      <CategoryContextProvider>
      <TypeContextProvider>
      <CategorySumContextProvider>
      <MonthSumContextProvider>
      <PersonContextProvider>
          <BrowserRouter>
            <Routes>
              
              {/* Route for home page which has subpages*/}
              <Route path="/*" element={<Home/>} />

            </Routes>
          </BrowserRouter>
      </PersonContextProvider>
      </MonthSumContextProvider>
      </CategorySumContextProvider>
      </TypeContextProvider>
      </CategoryContextProvider>
      </TransactionContextProvider>

    </div>
  );
}

export default App;