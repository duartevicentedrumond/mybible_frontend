import React from 'react';

import SectionTable from "./components/SectionTable";

export default function SectionList(data) {

    const sections = data.Sections;

    return (
        
        <SectionTable
            sections={sections}
        />

    )
};