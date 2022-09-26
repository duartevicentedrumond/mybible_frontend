import React from 'react';

import BuildingTable from "./components/BuildingTable";

export default function BuildingList(data) {

    const buildings = data.Buildings;

    return (
        
        <BuildingTable
            buildings={buildings}
        />

    )
};