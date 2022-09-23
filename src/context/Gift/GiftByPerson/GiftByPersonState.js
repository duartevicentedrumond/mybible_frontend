import React, { useReducer } from "react";
import axios from "axios";

import giftsByPersonReducer from "./GiftByPersonReducer";
import GiftByPersonContext from "./GiftByPersonContext";
import { GET_ALL_GIFTS_BY_PERSON } from "./GiftByPersonTypes";

const initialState = {
    giftsByPerson: []
};

export const GiftByPersonContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(giftsByPersonReducer, initialState);

    const getGiftsByPerson = async () => {
        const response = await axios.get(
            'http://localhost:8080/gift/getGiftByPerson');

        dispatch({
            type: GET_ALL_GIFTS_BY_PERSON,
            payload: response.data,
        });
    };

    return (
        <GiftByPersonContext.Provider value={{ ...state, getGiftsByPerson }}>
            {children}
        </GiftByPersonContext.Provider>
    )
};