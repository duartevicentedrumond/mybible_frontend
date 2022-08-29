import React, { useReducer } from "react";
import axios from "axios";

import monthSumReducer from "./MonthSumReducer";
import MonthSumContext from "./MonthSumContext";
import { GET_ALL } from "./MonthSumTypes";

const initialState = {
    monthsSum: []
};

export const MonthSumContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(monthSumReducer, initialState);

    const getMonthsSum = async () => {
        const response = await axios.get(
            'http://localhost:8080/transaction/getSumByMonth');

        dispatch({
            type: GET_ALL,
            payload: response.data,
        });
    };

    return (
        <MonthSumContext.Provider value={{ ...state, getMonthsSum }}>
            {children}
        </MonthSumContext.Provider>
    )
};