import React, { useReducer } from "react";
import axios from "axios";

import furnitureReducer from "./FurnitureReducer";
import FurnitureContext from "./FurnitureContext";
import { GET_FURNITURES, ADD_FURNITURE, UPDATE_FURNITURE, DELETE_FURNITURE } from "./FurnitureTypes";

const initialState = {
    furnitures: []
};

export const FurnituresContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(furnitureReducer, initialState);

    const getFurnitures = async () => {
        const response = await axios.get(
            'http://localhost:8080/furniture/getAll');

        dispatch({
            type: GET_FURNITURES,
            payload: response.data,
        });
    };

    const addFurniture = async (furniture) => {

        const response = await axios.post(
            'http://localhost:8080/furniture/add', furniture);
        
        console.log(response.data);

        dispatch({
            type: ADD_FURNITURE, 
            payload: furniture
        });
    };

    const updateFurniture = async (furniture) => {

        const response = await axios.put(
            'http://localhost:8080/furniture/update/' + furniture.furnitureId, furniture);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_FURNITURE, 
            payload: furniture
        });
    };

    const deleteFurniture = async (furnitureId) => {

        const response = await axios.delete('http://localhost:8080/furniture/delete/' + furnitureId);

        console.log(response);
        
        dispatch({
            type: DELETE_FURNITURE,
            payload: furnitureId,
        });

    };

    return (
        <FurnitureContext.Provider value={{ ...state, getFurnitures, addFurniture, deleteFurniture, updateFurniture }}>
            {children}
        </FurnitureContext.Provider>
    )
};