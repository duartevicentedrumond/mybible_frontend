import React, { useReducer } from "react";
import axios from "axios";

import boxReducer from "./BoxReducer";
import BoxContext from "./BoxContext";
import { GET_BOXES, ADD_BOX, UPDATE_BOX, DELETE_BOX } from "./BoxTypes";

const initialState = {
    boxes: []
};

export const BoxesContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(boxReducer, initialState);

    const getBoxes = async () => {
        const response = await axios.get(
            'http://localhost:8080/box/getAll');

        dispatch({
            type: GET_BOXES,
            payload: response.data,
        });
    };

    const addBox = async (box) => {

        const response = await axios.post(
            'http://localhost:8080/box/add', box);
        
        console.log(response.data);

        dispatch({
            type: ADD_BOX, 
            payload: box
        });
    };

    const updateBox = async (box) => {

        const updatedBox = {
            boxId: box.boxId,
            name: box.name,
            active: box.active,
            since: box.since,
            until: box.until,
            building: box.building,
            room: box.room,
            furniture: box.furniture,
            section: box.section,
        }

        const response = await axios.put(
            'http://localhost:8080/box/update/' + box.boxId, updatedBox);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_BOX, 
            payload: updatedBox
        });
    };

    const deleteBox = async (boxId) => {

        const response = await axios.delete('http://localhost:8080/box/delete/' + boxId);

        console.log(response);
        
        dispatch({
            type: DELETE_BOX,
            payload: boxId,
        });

    };

    return (
        <BoxContext.Provider value={{ ...state, getBoxes, addBox, deleteBox, updateBox }}>
            {children}
        </BoxContext.Provider>
    )
};