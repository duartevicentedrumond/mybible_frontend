import { useReducer } from "react";
import axios from "axios";

import transactionReducer from "./TransactionReducer";
import TransactionContext from "./TransactionContext";
import { GET_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

const initialState = {
    transactions: []
};

export const TransactionContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const getTransactions = async () => {

        fetch('http://127.0.0.1:8080/transaction/getAll')
            .then( response => response.json())
            .then( data => {
                dispatch({
                    type: GET_TRANSACTIONS, 
                    payload: data
                });
                console.log("TRANSACTIONS LIST (STATE)\n\n",data);
            })
            .catch(function(error) {
                console.log("Error getting all transactions from API", error);
            });
    };

    const addTransaction = async (transaction) => {

        let fetchData = {
            method: 'POST',
            body: JSON.stringify(transaction),
            headers: new Headers({
                'Content-Type': 'application/json; charset=UTF-8'
            })
        }

        console.log("TRANSACTION ADDED (STATE)\n\n",JSON.stringify(transaction));

        fetch('http://localhost:8080/transaction/add', fetchData)
            .then( response => response.json())
            .then( data => {
                console.log("TRANSACTION ADDED RESPONSE (STATE)\n\n",data);
            })
            .then( 
                dispatch({
                    type: ADD_TRANSACTION, 
                    payload: transaction
                })
            )
            .catch(function(error) {
                console.log("Error posting transaction to API", error);
            });
    };

    const updateTransaction = async (transaction) => {

        const updatedTransaction = transaction;

        console.log(updatedTransaction);

        const response = await axios.put(
            'http://localhost:8080/transaction/update/' + updatedTransaction.transactionId, updatedTransaction);

            console.log(response)

        dispatch({
            type: UPDATE_TRANSACTION, 
            payload: updatedTransaction
        });
    };

    const deleteTransaction = (id) => {
        
        dispatch({
            type: DELETE_TRANSACTION,
            payload: id,
        });

    };

    return (
        <TransactionContext.Provider value={{ ...state, getTransactions, addTransaction, deleteTransaction, updateTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
};