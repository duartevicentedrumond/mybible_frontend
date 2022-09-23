import React, { useReducer } from "react";
import axios from "axios";

import giftReducer from "./GiftReducer";
import GiftContext from "./GiftContext";
import { GET_GIFTS, ADD_GIFT, UPDATE_GIFT, DELETE_GIFT } from "./GiftTypes";

const initialState = {
    gifts: []
};

export const GiftContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(giftReducer, initialState);

    const getGifts = async () => {
        const response = await axios.get(
            'http://localhost:8080/gift/getAll');

        dispatch({
            type: GET_GIFTS,
            payload: response.data,
        });
    };

    const addGift = async (gift) => {

        const response = await axios.post(
            'http://localhost:8080/gift/add', gift);
        
        console.log(response.data);

        dispatch({
            type: ADD_GIFT, 
            payload: gift
        });
    };

    const updateGift = async (gift) => {

        const response = await axios.put(
            'http://localhost:8080/gift/update/' + gift.giftId, gift);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_GIFT, 
            payload: gift
        });
    };

    const deleteGift = async (giftId) => {

        const response = await axios.delete('http://localhost:8080/gift/delete/' + giftId);

        console.log(response)
        
        dispatch({
            type: DELETE_GIFT,
            payload: giftId,
        });

    };

    return (
        <GiftContext.Provider value={{ ...state, getGifts, addGift, deleteGift, updateGift }}>
            {children}
        </GiftContext.Provider>
    )
};