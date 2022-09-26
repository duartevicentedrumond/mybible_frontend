import React, { useEffect } from 'react';

import PersonTable from "./components/PersonTable";

export default function PersonList(data) {

    const [people, getPeople] = data.People;
    const getGiftsByPerson = data.Gifts;

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        getPeople();
        getGiftsByPerson();

    }, []); //page first rendering dependency

    return (

        <PersonTable
            people={people}
        />

    )
};