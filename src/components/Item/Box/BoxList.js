import React from 'react';

import BoxTable from "./components/BoxTable";

export default function BoxList(data) {

    const boxes = data.Boxes;

    return (
        
        <BoxTable
            boxes={boxes}
        />

    )
};