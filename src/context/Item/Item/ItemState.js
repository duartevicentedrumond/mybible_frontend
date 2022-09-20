import React, { useReducer } from "react";
import axios from "axios";

import itemReducer from "./ItemReducer";
import ItemContext from "./ItemContext";
import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./ItemTypes";

const initialState = {
    items: []
};

export const ItemsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(itemReducer, initialState);

    const getItems = async () => {
        const response = await axios.get(
            'http://localhost:8080/item/getAll');

        dispatch({
            type: GET_ITEMS,
            payload: response.data,
        });
    };

    const addItem = async (item) => {

        const response = await axios.post(
            'http://localhost:8080/item/add', item);
        
        console.log(response.data);

        dispatch({
            type: ADD_ITEM, 
            payload: item
        });
    };

    const updateItem = async (item) => {

        const response = await axios.put(
            'http://localhost:8080/item/update/' + item.itemId, item);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_ITEM, 
            payload: item
        });
    };

    const deleteItem = async (itemId) => {

        const response = await axios.delete('http://localhost:8080/item/delete/' + itemId);

        console.log(response);
        
        dispatch({
            type: DELETE_ITEM,
            payload: itemId,
        });

    };

    return (
        <ItemContext.Provider value={{ ...state, getItems, addItem, deleteItem, updateItem }}>
            {children}
        </ItemContext.Provider>
    )
};