import React, { useReducer } from "react";
import axios from "axios";

import allJoinedReducer from "./AllJoinedReducer";
import AllJoinedContext from "./AllJoinedContext";
import { GET_ALL_JOINED } from "./AllJoinedTypes";

const initialState = {
    allJoined: []
};

export const AllJoinedContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(allJoinedReducer, initialState);

    const getAllJoined = async () => {
        const response = await axios.get(
            'http://localhost:8080/item/getAllJoined');

        dispatch({
            type: GET_ALL_JOINED,
            payload: response.data,
        });
    };

    return (
        <AllJoinedContext.Provider value={{ ...state, getAllJoined }}>
            {children}
        </AllJoinedContext.Provider>
    )
};