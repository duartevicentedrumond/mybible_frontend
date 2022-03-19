import React, { useContext, useEffect } from 'react';
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const TransactionList = () => {

    const {transactions, deleteTransaction, getTransactions} = useContext(GlobalContext);

    useEffect(
        () => {
            getTransactions();
        }
    , []);

    return (
        <div className="flex">

            <button> 
                New
            </button>

            <div className='flex'>
                {transactions.map( (transaction) => ( 
                
                <div>
                    <div key={transaction.id}>
                        {transaction.description}
                    </div>
                    <button onClick={() => deleteTransaction(transaction.id)}> 
                        delete
                    </button>
                    <Link to={`/transaction/edit/${transaction.id}`}> 
                        edit
                    </Link>
                </div>
                
                ))}
            </div>
        </div>
    )
}

export default TransactionList