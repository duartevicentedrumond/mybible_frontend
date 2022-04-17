import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import TransactionInfo from "./TransactionInfo";
import { Styled__Nav } from "../../design/style";

function Transaction() {
  return (
    <div className="container-fluid">

      <div className='row'>

        <div className="col-10 text-start py-3">

          <ul className="nav nav-tabs">
            <li className="nav-item pe-3">
              <Styled__Nav.TabLink to={'/transaction'}>
                Transactions
              </Styled__Nav.TabLink>
            </li>
            <li className="nav-item pe-3">
              <Styled__Nav.TabLink to={'/transaction/add'}>
                New
              </Styled__Nav.TabLink>
            </li>
          </ul>

          <Routes>
            <Route path="/" element={<TransactionList/>} />
            <Route path="add" element={<TransactionForm/>} />
            <Route path="edit/:id" element={<TransactionForm/>} />
          </Routes> 
        </div>
          
        <div className="col text-start py-3">
          <Routes>
            <Route path="/" element={<TransactionInfo/>} />
            <Route path="add" element={<TransactionInfo/>} />
            <Route path="edit/:id" element={<TransactionInfo/>} />
          </Routes>
        </div>

      </div>
    </div>
  )
}

export default Transaction