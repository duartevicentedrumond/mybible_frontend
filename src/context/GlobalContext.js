import { createContext, useReducer } from "react";
import transactionReducer from "./TransactionReducer";
    
const initialState = {
    transactions: [
        {
            id: 1,
            date: "2022-03-08",
            description: "descrição 1",
            amount: "3.56",
            type: 1,
            category: 2
        },
        {
            id: 2,
            date: "2022-03-07",
            description: "descrição 2",
            amount: "3.56",
            type: 1,
            category: 2
        }
    ]
}

export const GlobalContext = createContext(initialState)

export const ContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(transactionReducer, initialState);

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
        <GlobalContext.Provider value={{ ...state, addTransaction, deleteTransaction, updateTransaction }}>
            {children}
        </GlobalContext.Provider>
    )
}