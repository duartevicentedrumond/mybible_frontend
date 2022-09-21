import React, { useContext, useEffect } from 'react';

import RoomContext from "../../../context/Item/Room/RoomContext";
import RoomTable from "./components/RoomTable";

export default function RoomList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {rooms, getRooms} = useContext(RoomContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getRooms();
    }, []);

    return (
        
        <RoomTable
            rooms={rooms}
        />

    )
};