import React from 'react';

import { Route, Routes } from "react-router-dom";

import NavBar from "./NavBar";
import Transaction from "../components/Transaction/Transaction";
import Person from "../components/Person/Person";     

const Home = () => {
  return (
    <div>

        <NavBar/>

        <div className='px-5 pt-3'>
          <Routes>
          
              {/* Route for 'transaction' page which has subpages*/}
              <Route path="transaction/*" element={<Transaction/>} />

              {/* Route for 'person' page which has subpages*/}
              <Route path="people/*" element={<Person/>} />

          </Routes>
        </div>
    </div>
  )
}

export default Home