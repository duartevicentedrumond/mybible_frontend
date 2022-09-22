import React, { useReducer } from "react";
import axios from "axios";

import gifttypeReducer from "./GifttypeReducer";
import GifttypeContext from "./GifttypeContext";
import { GET_GIFTTYPES, ADD_GIFTTYPE, UPDATE_GIFTTYPE, DELETE_GIFTTYPE } from "./GifttypeTypes";

const initialState = {
    gifttypes: []
};

export const GifttypeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(gifttypeReducer, initialState);

    const getGifttypes = async () => {
        const response = await axios.get(
            'http://localhost:8080/gifttype/getAll');

        dispatch({
            type: GET_GIFTTYPES,
            payload: response.data,
        });
    };

    const addGifttype = async (gifttype) => {

        const response = await axios.post(
            'http://localhost:8080/gifttype/add', gifttype);
        
        console.log(response.data);

        dispatch({
            type: ADD_GIFTTYPE, 
            payload: gifttype
        });
    };

    const updateGifttype = async (gifttype) => {

        const response = await axios.put(
            'http://localhost:8080/gifttype/update/' + gifttype.gifttypeId, gifttype);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_GIFTTYPE, 
            payload: gifttype
        });
    };

    const deleteGifttype = async (gifttypeId) => {

        const response = await axios.delete('http://localhost:8080/gifttype/delete/' + gifttypeId);

        console.log(response)
        
        dispatch({
            type: DELETE_GIFTTYPE,
            payload: gifttypeId,
        });

    };

    return (
        <GifttypeContext.Provider value={{ ...state, getGifttypes, addGifttype, deleteGifttype, updateGifttype }}>
            {children}
        </GifttypeContext.Provider>
    )
};