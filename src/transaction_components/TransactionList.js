import React, { useContext, useEffect } from 'react';
import TransactionContext from "../context/Transaction/TransactionContext";
import { Link } from "react-router-dom";

const TransactionList = () => {

    const {transactions, deleteTransaction, getTransactions} = useContext(TransactionContext);

    useEffect(
        () => {
            getTransactions();
        }
    , []);

    return (
        <div className="flex">

            <Link to={'/transaction/add'}> 
                new
            </Link>

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Date</th>
                        <th scope="col">Description</th>
                        <th scope="col">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map( (transaction) => ( 
                    
                    <tr key={transaction.id}>
                        <th scope="row">
                            <Link to={`/transaction/edit/${transaction.id}`}> 
                                {transaction.id}
                            </Link>
                        </th>
                        <th>{transaction.date}</th>
                        <th>{transaction.description}</th>
                        <th>{transaction.amount}</th>
                    </tr>
                    
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TransactionList;