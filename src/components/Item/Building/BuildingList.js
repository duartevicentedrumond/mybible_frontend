import React, { useContext, useEffect } from 'react';

import BuildingContext from "../../../context/Item/Building/BuildingContext";
import BuildingTable from "./components/BuildingTable";

export default function BuildingList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {buildings, getBuildings} = useContext(BuildingContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getBuildings();
    }, []);

    return (
        
        <BuildingTable
            buildings={buildings}
        />

    )
};