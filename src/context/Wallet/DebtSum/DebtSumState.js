import React, { useReducer } from "react";
import axios from "axios";

import debtSumReducer from "./DebtSumReducer";
import DebtSumContext from "./DebtSumContext";
import { GET_ALL } from "./DebtSumTypes";

const initialState = {
    debtsSum: []
};

export const DebtSumContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(debtSumReducer, initialState);

    const getDebtsSum = async () => {
        const response = await axios.get(
            'http://localhost:8080/transaction/getSumByDebt');

        dispatch({
            type: GET_ALL,
            payload: response.data,
        });
    };

    return (
        <DebtSumContext.Provider value={{ ...state, getDebtsSum }}>
            {children}
        </DebtSumContext.Provider>
    )
};