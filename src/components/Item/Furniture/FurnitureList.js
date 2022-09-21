import React, { useContext, useEffect } from 'react';

import FurnitureContext from "../../../context/Item/Furniture/FurnitureContext";
import FurnitureTable from "./components/FurnitureTable";

export default function FurnitureList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {furnitures, getFurnitures} = useContext(FurnitureContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getFurnitures();
    }, []);

    return (
        
        <FurnitureTable
            furnitures={furnitures}
        />

    )
};