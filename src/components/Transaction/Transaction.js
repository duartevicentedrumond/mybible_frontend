import React from 'react';
import { Route, Routes, Link } from "react-router-dom";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { Styled__Nav } from "../../design/style";

function Transaction() {
  return (
    <div className="container-fluid">

      <div className="text-start py-3">

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
        
      </div>
        
        <Routes>
          <Route path="/" element={<TransactionList/>} />
          <Route path="add" element={<TransactionForm/>} />
          <Route path="edit/:id" element={<TransactionForm/>} />
        </Routes>
        
    </div>
  )
}

export default Transaction