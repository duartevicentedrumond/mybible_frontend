import React, { useContext, useEffect } from 'react';
import TransactionContext from "../context/Transaction/TransactionContext";
import { Link } from "react-router-dom";

const TransactionList = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {transactions, getTransactions} = useContext(TransactionContext);

    //Execute getTransactions function as soon as the page is rendered
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

            <div className='table-responsive'>

                {/*
                    Render a table with the following features:
                        - table-hover: highlight the table's row when hovered
                        - table-sm: reduce row vertical spacing
                        - w-auto: auto columns' width

                        <th>
                            - text-end: horizontal align text to right
                            - text-start: horizontal align text to left
                            - px-4: column horizontal padding (left and right) with 4
                */}
                <table className="table table-hover table-sm w-auto">

                    <thead>
                        <tr>
                            <th scope="col" className="text-end px-4">Date</th>
                            <th scope="col" className="text-start px-4">Amount</th>
                            <th scope="col" className="text-start px-4">Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map( (transaction) => ( 
                        
                        <tr key={transaction.id}>
                            <th scope="col" className="text-end px-4">
                                <Link to={`/transaction/edit/${transaction.id}`}> 
                                    {transaction.date}
                                </Link>
                            </th>
                            <th scope="col" className="text-start px-4">
                                <Link to={`/transaction/edit/${transaction.id}`}> 
                                    {transaction.amount}
                                </Link>
                            </th>
                            <th scope="col" className="text-start px-4">
                                <Link to={`/transaction/edit/${transaction.id}`}> 
                                    {transaction.description}
                                </Link>
                            </th>
                        </tr>
                        
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default TransactionList;