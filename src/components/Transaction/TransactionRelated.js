import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import TransactionContext from "../../context/Wallet/Transaction/TransactionContext";
import { Styled__Title, Styled__SideBar } from "../../design/style";

const TransactionRelated = () => {

    //Get getTransactions function and transactions state object from TransactionState through TransactionContext
    const {transactions, getTransactions} = useContext(TransactionContext);
    const params = useParams();

    const [transaction, setTransaction] = useState({
        description: '',
        date: '',
        amount: '',
        type: {
          typeId: '1'
        },
        category: {
          categoryId: '1'
        },
        person: {
          personId: '0'
        },
        transactionChildren: [],
        transactionParent: { transactionId: null },
      });

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
        
            const transactionFound = transactions.find( (transaction) => transaction.transactionId == params.id);
        
            if(transactionFound) {
                setTransaction(transactionFound);
            }
        }
    , [params.id, transactions]);

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

            {transaction.transactionParent.transactionId != null ? 
            (<Styled__Title.InfoTitle>
                Parent
            </Styled__Title.InfoTitle>)
            : false }
            <div className="list-group" style={{'borderRadius': '25px'}}>
                {transaction.transactionParent.transactionId != null ?  (
                <Styled__SideBar.ParentChild 
                    to={`/transaction/edit/${transaction.transactionParent.transactionId}`} 
                    className="list-group-item list-group-item-action">
                        Transaction#{transaction.transactionParent.transactionId}
                </Styled__SideBar.ParentChild>) : false}
            </div>

            {transaction.transactionChild.length >= 1 ? 
            (<Styled__Title.InfoTitle>
                Child
            </Styled__Title.InfoTitle>)
            : false }
            <div className="list-group" style={{'borderRadius': '25px'}}>
                {transaction.transactionChildren.length >= 1 ? (transaction.transactionChildren.map( (child) => (
                <Styled__SideBar.ParentChild 
                    to={`/transaction/edit/${child.transactionId}`}
                    className="list-group-item list-group-item-action">
                        Transaction#{child.transactionId}
                </Styled__SideBar.ParentChild>
                ))) : false}
            </div>
        </div>
    )
}

export default TransactionRelated;