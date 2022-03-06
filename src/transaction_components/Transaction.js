import React from 'react';
import { Route, Routes, Link } from "react-router-dom";
import { FiBold } from "react-icons/fi";

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