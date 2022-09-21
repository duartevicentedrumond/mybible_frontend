import React, { useContext, useEffect } from 'react';

import BoxContext from "../../../context/Item/Box/BoxContext";
import BoxTable from "./components/BoxTable";

export default function BoxList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {boxes, getBoxes} = useContext(BoxContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getBoxes();
    }, []);

    return (
        
        <BoxTable
            boxes={boxes}
        />

    )
};