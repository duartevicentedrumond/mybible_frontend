import React, { useReducer } from "react";
import axios from "axios";

import transactionReducer from "./TransactionReducer";
import TransactionContext from "./TransactionContext";
import { GET_TRANSACTIONS, GET_SUBTRANSACTION_BY_TRANSACTION, GET_CATEGORIES_SUM, GET_DEBTS_SUM, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

const initialState = {
    transactions: [],
    subtransactionsByTransaction: [],
    categoriesSum: [],
    debtsSum: []
};

export const TransactionContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(transactionReducer, initialState);

    async function getTransactions() {

        await fetch('http://localhost:8080/transaction/getAll')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_TRANSACTIONS,
                    payload: data
                });
                console.log("TRANSACTIONS LIST (STATE)\n\n", data);
            })
            .catch(function (error) {
                console.log("Error getting all transactions from API", error);
            });
    };

    async function getSubtransactionsByTransaction() {

        await fetch('http://localhost:8080/transaction/getSubtransactionByTransaction')
            .then(response => response.json())
            .then(data => {
                dispatch({
                    type: GET_SUBTRANSACTION_BY_TRANSACTION,
                    payload: data
                });
                console.log("SUBTRANSACTIONS BY TRANSACTION LIST (STATE)\n\n", data);
            })
            .catch(function (error) {
                console.log("Error getting all subtransactions by transaction from API", error);
            });
    };

    async function getCategoriesSum() {
        const response = await axios.get(
            'http://localhost:8080/transaction/getSumByCategory');

        dispatch({
            type: GET_CATEGORIES_SUM,
            payload: response.data,
        });
    };

    async function getDebtsSum() {
        const response = await axios.get(
            'http://localhost:8080/transaction/getSumByDebt');

        dispatch({
            type: GET_DEBTS_SUM,
            payload: response.data,
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

        console.log("TRANSACTION ADDED (STATE)\n\n", JSON.stringify(transaction));

        fetch('http://localhost:8080/transaction/add', fetchData)
            .then(response => response.json())
            .then(data => {
                console.log("TRANSACTION ADDED RESPONSE (STATE)\n\n", data);
            })
            .then(
                dispatch({
                    type: ADD_TRANSACTION,
                    payload: transaction
                })
            )
            .catch(function (error) {
                console.log("Error posting transaction to API", error);
            });
    };

    const updateTransaction = async (transaction) => {

        const updatedTransaction = transaction;

        console.log("UPDATED TRANSACTION:\n");
        console.log(updatedTransaction);

        const response = await axios.put(
            'http://localhost:8080/transaction/update/' + updatedTransaction.transactionId, updatedTransaction);

        console.log(response)

        dispatch({
            type: UPDATE_TRANSACTION,
            payload: updatedTransaction
        });
    };

    const deleteTransaction = async (transactionId) => {

        const response = await axios.delete(
            'http://localhost:8080/transaction/delete/' + transactionId);

        console.log(response)

        dispatch({
            type: DELETE_TRANSACTION,
            payload: transactionId,
        });

    };

    return (
        <TransactionContext.Provider value={{ ...state, getTransactions, getSubtransactionsByTransaction, getCategoriesSum, getDebtsSum, addTransaction, deleteTransaction, updateTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
};