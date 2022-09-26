import React from 'react';

import RoomTable from "./components/RoomTable";

export default function RoomList(data) {

    const rooms = data.Rooms;

    return (
        
        <RoomTable
            rooms={rooms}
        />

    )
};