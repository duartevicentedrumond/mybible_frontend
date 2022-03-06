import React from 'react';

import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Transaction from "../transaction_components/Transaction";    

const Home = () => {
  return (
    <div>

        <NavBar/>

        <Routes>
        
            {/* Route for 'transaction' page which has subpages*/}
            <Route path="transaction/*" element={<Transaction/>} />

        </Routes>
    </div>
  )
}

export default Home