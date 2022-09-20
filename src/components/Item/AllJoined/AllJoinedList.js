import React, { useContext, useEffect } from 'react';

import AllJoinedContext from "../../../context/Item/AllJoined/AllJoinedContext";
import AllJoinedTable from "../AllJoined/components/AllJoinedTable";

export default function AllJoinedList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {allJoined, getAllJoined} = useContext(AllJoinedContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getAllJoined();
        }
    , []);

    return (
        
        <AllJoinedTable
            allJoined={allJoined}
        />

    )
};