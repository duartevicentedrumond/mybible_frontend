import React, { useEffect } from 'react';

import PersonTable from "./components/PersonTable";

export default function PersonList(data) {

    const [people, getPeople] = data.People;
    const [getGifts, getGiftsByPerson] = data.Gifts;

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        getPeople();
        getGifts();
        getGiftsByPerson();

    }, []); //page first rendering dependency

    return (

        <PersonTable
            people={people}
        />

    )
};