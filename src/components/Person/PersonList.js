import React, { useContext, useEffect } from 'react';

import PersonContext from "../../context/Person/Person/PersonContext";
import PersonTable from "./components/PersonTable";

export default function PersonList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {people, getPeople} = useContext(PersonContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(
        () => {
            getPeople();
        }
    , []);

    return (
        
        <PersonTable
            people={people}
        />

    )
};