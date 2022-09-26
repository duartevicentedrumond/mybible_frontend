import React, { useEffect } from 'react';

import TransactionTable from "./Components/TransactionTable";

export default function TransactionList(data) {

  const [transactions, getTransactions, getCategoriesSum, getDebtsSum] = data.Transactions;

  //run on the first render and anytime any dependency value changes
  useEffect(() => {

    getTransactions();
    getCategoriesSum();
    getDebtsSum();

  }, []); //page first rendering dependency

  return (

    <TransactionTable
      Transactions={transactions}
    />

  )
};