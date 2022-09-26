import React from 'react';

import TransactionTable from "./Components/TransactionTable";

export default function TransactionList(data) {

    const transactions = data.Transactions;

    return (
        
        <TransactionTable
            transactions={transactions}
        />

    )
};