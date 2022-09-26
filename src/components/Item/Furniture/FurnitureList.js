import React from 'react';

import FurnitureTable from "./components/FurnitureTable";

export default function FurnitureList(data) {

    const furnitures = data.Furnitures;

    return (
        
        <FurnitureTable
            furnitures={furnitures}
        />

    )
};