import React, { useReducer } from "react";
import axios from "axios";

import roomReducer from "./RoomReducer";
import RoomContext from "./RoomContext";
import { GET_ROOMS, ADD_ROOM, UPDATE_ROOM, DELETE_ROOM } from "./RoomTypes";

const initialState = {
    rooms: []
};

export const RoomsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(roomReducer, initialState);

    const getRooms = async () => {
        const response = await axios.get(
            'http://localhost:8080/room/getAll');

        dispatch({
            type: GET_ROOMS,
            payload: response.data,
        });
    };

    const addRoom = async (room) => {

        const response = await axios.post(
            'http://localhost:8080/room/add', room);
        
        console.log(response.data);

        dispatch({
            type: ADD_ROOM, 
            payload: room
        });
    };

    const updateRoom = async (room) => {

        const response = await axios.put(
            'http://localhost:8080/room/update/' + room.roomId, room);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_ROOM, 
            payload: room
        });
    };

    const deleteRoom = async (roomId) => {

        const response = await axios.delete('http://localhost:8080/room/delete/' + roomId);

        console.log(response);
        
        dispatch({
            type: DELETE_ROOM,
            payload: roomId,
        });

    };

    return (
        <RoomContext.Provider value={{ ...state, getRooms, addRoom, deleteRoom, updateRoom }}>
            {children}
        </RoomContext.Provider>
    )
};