import React, { useContext, useEffect } from 'react';

import TransactionContext from "../../context/Transaction/TransactionContext";
import { Styled__Table } from "../../design/style";

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
                    <Styled__Table.Header>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4">
                            Date
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4">
                            Amount
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-6 text-start px-4">
                            Description
                        </Styled__Table.HeaderColumn>
                    </Styled__Table.Header>
                </thead>

                <Styled__Table.Body style={{borderTop: '0px'}}>
                    {transactions.map( (transaction) => ( 
                        
                    <tr key={transaction.transactionId}>
                        <th scope="col" className="col-1 text-end px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}> 
                                {transaction.date}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="col-1 text-end px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}> 
                                {transaction.amount}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="col-6 text-start px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}> 
                                {transaction.description}
                            </Styled__Table.RowLink>
                        </th>
                    </tr>
                        
                    ))}
                </Styled__Table.Body>

            </table>

        </div>
    )
}

export default TransactionList;