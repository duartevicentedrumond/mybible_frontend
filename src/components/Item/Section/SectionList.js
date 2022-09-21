import React, { useContext, useEffect } from 'react';

import SectionContext from "../../../context/Item/Section/SectionContext";
import SectionTable from "./components/SectionTable";

export default function SectionList() {

    //Get getPeople function and people state object from PersonState through PersonContext
    const {sections, getSections} = useContext(SectionContext);

    //Execute getTransactions function as soon as the page is rendered
    useEffect(() => {
        getSections();
    }, []);

    return (
        
        <SectionTable
            sections={sections}
        />

    )
};