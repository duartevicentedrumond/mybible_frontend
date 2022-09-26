import React from 'react';

import AllJoinedTable from "../AllJoined/components/AllJoinedTable";

export default function AllJoinedList(data) {

    const allJoined = data.AllJoined;

    return (
        
        <AllJoinedTable
            allJoined={allJoined}
        />

    )
};