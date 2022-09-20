import React, { useReducer } from "react";
import axios from "axios";

import buildingReducer from "./BuildingReducer";
import BuildingContext from "./BuildingContext";
import { GET_BUILDINGS, ADD_BUILDING, UPDATE_BUILDING, DELETE_BUILDING } from "./BuildingTypes";

const initialState = {
    buildings: []
};

export const BuildingsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(buildingReducer, initialState);

    const getBuildings = async () => {
        const response = await axios.get(
            'http://localhost:8080/building/getAll');

        dispatch({
            type: GET_BUILDINGS,
            payload: response.data,
        });
    };

    const addBuilding = async (building) => {

        const response = await axios.post(
            'http://localhost:8080/building/add', building);
        
        console.log(response.data);

        dispatch({
            type: ADD_BUILDING, 
            payload: building
        });
    };

    const updateBuilding = async (building) => {

        const response = await axios.put(
            'http://localhost:8080/building/update/' + building.buildingId, building);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_BUILDING, 
            payload: building
        });
    };

    const deleteBuilding = async (buildingId) => {

        const response = await axios.delete('http://localhost:8080/building/delete/' + buildingId);

        console.log(response);
        
        dispatch({
            type: DELETE_BUILDING,
            payload: buildingId,
        });

    };

    return (
        <BuildingContext.Provider value={{ ...state, getBuildings, addBuilding, deleteBuilding, updateBuilding }}>
            {children}
        </BuildingContext.Provider>
    )
};