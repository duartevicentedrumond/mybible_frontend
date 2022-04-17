import React, { useContext, useEffect } from 'react';

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import CategorySumContext from "../../context/Wallet/CategorySum/CategorySumContext";
import { Styled__Table } from "../../design/style";

const TransactionList = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {transactions, getTransactions} = useContext(TransactionContext);
    const {categoriesSum, getCategoriesSum} = useContext(CategorySumContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getTransactions();
            getCategoriesSum();
        }
    , []);

    return (
        <div className="flex table-responsive">

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
            <table className="table table-hover table-sm">

                <thead>
                    <Styled__Table.Header>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'white-space': 'nowrap'}}>
                            #
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'white-space': 'nowrap'}}>
                            Date
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="col-1 text-end px-4" style={{'white-space': 'nowrap'}}>
                            Amount
                        </Styled__Table.HeaderColumn>
                        <Styled__Table.HeaderColumn scope="col" className="text-start px-4" style={{'white-space': 'nowrap'}}>
                            Description
                        </Styled__Table.HeaderColumn>
                    </Styled__Table.Header>
                </thead>

                <Styled__Table.Body style={{borderTop: '0px'}}>
                    {transactions.map( (transaction) => ( 
                        
                    <tr key={transaction.transactionId}>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'white-space': 'nowrap'}}>
                                {transaction.transactionId}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-end align-middle px-4">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'white-space': 'nowrap'}}>
                                {transaction.date}
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-end px-4 align-middle">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{'white-space': 'nowrap'}}> 
                                {parseFloat(transaction.amount).toFixed(2)}     €
                            </Styled__Table.RowLink>
                        </th>
                        <th scope="col" className="text-start px-4 align-middle">
                            <Styled__Table.RowLink to={`/transaction/edit/${transaction.transactionId}`}style={{width: '100%'}}> 
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