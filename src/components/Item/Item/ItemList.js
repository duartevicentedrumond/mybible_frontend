import React, { useContext, useEffect } from 'react';

import ItemContext from "../../../context/Item/Item/ItemContext";
import ItemTable from "./components/ItemTable";

export default function ItemList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {items, getItems} = useContext(ItemContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getItems();
    }, []);

    return (
        
        <ItemTable
            items={items}
        />

    )
};