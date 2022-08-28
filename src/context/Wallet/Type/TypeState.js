import React, { useReducer } from "react";
import axios from "axios";

import typeReducer from "./TypeReducer";
import TypeContext from "./TypeContext";
import { GET_TYPES, ADD_TYPE, UPDATE_TYPE, DELETE_TYPE } from "./TypeTypes";

const initialState = {
    types: []
};

export const TypeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(typeReducer, initialState);

    const getTypes = async () => {
        const response = await axios.get(
            'http://localhost:8080/type/getAll');

        dispatch({
            type: GET_TYPES,
            payload: response.data,
        });
    };

    const getType = async (id) => {
        const response = await axios.get('http://localhost:8080/type/' + id);
        console.log(response)
    };

    const addType = async (type) => {

        const newType = type;

        const response = await axios.post(
            'http://localhost:8080/type/add', newType);
        
        console.log(response.data);

        dispatch({
            type: ADD_TYPE, 
            payload: newType
        });
    };

    const updateType = async (type) => {

        const updatedType = type;

        const response = await axios.put(
            'http://localhost:8080/type/update/' + updatedType.typeId, updatedType);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_TYPE, 
            payload: type
        });
    };

    const deleteType = (id) => {
        
        dispatch({
            type: DELETE_TYPE,
            payload: id,
        });

    };

    return (
        <TypeContext.Provider value={{ ...state, getTypes, getType, addType, deleteType, updateType }}>
            {children}
        </TypeContext.Provider>
    )
};