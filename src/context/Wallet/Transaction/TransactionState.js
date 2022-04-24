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
        const response = await axios.get(
            'http://localhost:8080/transaction/getAll');

        dispatch({
            type: GET_TRANSACTIONS,
            payload: response.data,
        });
    };

    const getTransaction = async (id) => {
        const response = await axios.get('http://localhost:8080/transaction/' + id);
        console.log(response)
    };

    const addTransaction = async (transaction) => {

        const newTransaction = transaction;

        const response = await axios.post(
            'http://localhost:8080/transaction/add', newTransaction);

        dispatch({
            type: ADD_TRANSACTION, 
            payload: transaction
        });
    };

    const updateTransaction = async (transaction) => {

        const updatedTransaction = transaction;

        const response = await axios.put(
            'http://localhost:8080/transaction/update/' + updatedTransaction.transactionId, updatedTransaction);

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
        <TransactionContext.Provider value={{ ...state, getTransactions, getTransaction, addTransaction, deleteTransaction, updateTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
};