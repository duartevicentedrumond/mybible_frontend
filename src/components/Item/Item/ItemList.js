import React, { useContext, useEffect } from 'react';

import ItemTable from "./components/ItemTable";

export default function ItemList(data) {

    const items = data.Items;

    return (
        
        <ItemTable
            items={items}
        />

    )
};