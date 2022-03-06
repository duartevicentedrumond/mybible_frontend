import React from 'react';
import { Route, Routes } from "react-router-dom";

import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";

function Transaction() {
  return (
    <div>
        Transaction

        <Routes>
          <Route path="/" element={<TransactionList/>} />
          <Route path="add" element={<TransactionForm/>} />
        </Routes>
    </div>
  )
}

export default Transaction