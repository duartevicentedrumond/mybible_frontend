import { createContext, useReducer } from "react";
import transactionReducer from "./TransactionReducer";
import axios from "axios";
    
const initialState = {
    transactions: []
}

export const GlobalContext = createContext(initialState)

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
            type: 'ADD_TRANSACTION', 
            payload: transaction
        });
    };

    const updateTransaction = (transaction) => {

        dispatch({
            type: 'UPDATE_TRANSACTION', 
            payload: transaction
        });
    };

    const deleteTransaction = (id) => {
        
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id,
        });

    };

    return (
        <GlobalContext.Provider value={{ ...state, getTransactions, getTransaction, addTransaction, deleteTransaction, updateTransaction }}>
            {children}
        </GlobalContext.Provider>
    )
}