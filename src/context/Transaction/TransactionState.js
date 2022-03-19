import { useReducer } from "react";
import axios from "axios";

import transactionReducer from "./TransactionReducer";
import TransactionContext from "./TransactionContext";
import { ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

const initialState = {
    transactions: []
};

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    const getTransactions = async () => {
        const response = await axios.get(
            'http://localhost:8080/transaction/getAll');
        console.log(response.data)
    };

    const getTransaction = async (id) => {
        const response = await axios.get('http://localhost:8080/transaction/' + id);
        console.log(response)
    };

    const addTransaction = (transaction) => {

        dispatch({
            type: ADD_TRANSACTION, 
            payload: transaction
        });
    };

    const updateTransaction = (transaction) => {

        dispatch({
            type: UPDATE_TRANSACTION, 
            payload: transaction
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