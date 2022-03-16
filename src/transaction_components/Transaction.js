import React from 'react';
import { Route, Routes } from "react-router-dom";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

function Transaction() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<TransactionList/>} />
          <Route path="add" element={<TransactionForm/>} />
          <Route path="edit/:id" element={<TransactionForm/>} />
        </Routes>
    </div>
  )
}

export default Transaction