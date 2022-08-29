import React, { useState, useContext, useEffect } from 'react';

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import MonthSumContext from "../../context/Wallet/MonthSum/MonthSumContext";

import LineGraph from "./Components/LineGraph";

export default function TransactionChart() {

  //get context for addTransaction and updateTransaction functions and transactions object
  const { transactions, getTransactions } = useContext(TransactionContext);
  const { monthsSum, getMonthsSum } = useContext(MonthSumContext);

  //Execute getTransactions function as soon as the page is rendered
  useEffect(
    () => {
      getMonthsSum();
    }
  , []);

  return (
    <div className='d-flex flex-column table-responsive py-3'>
      <LineGraph dataArray={monthsSum}/>
    </div>
  );

};