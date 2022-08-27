import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import TransactionTable from "./Components/TransactionTable";

const TransactionList = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {transactions, getTransactions} = useContext(TransactionContext);

    //get frontend directory
    const history = useNavigate();

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getTransactions();
        }
    , []);

    return (
        
        <TransactionTable
            transactions={transactions}
        />

    )
}

export default TransactionList;