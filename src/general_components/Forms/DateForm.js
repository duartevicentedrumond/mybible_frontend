import React from 'react';

import { Styled } from "../../design/style";

export default function DateForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const label = data.label;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            <Styled.FormLabel>{label}</Styled.FormLabel>
            <Styled.FormDate 
                selected={new Date(value)} 
                onChange={(date)=>onChangeField(date)}
                showYearDropdown
                dateFormat="yyyy-MM-dd"
            />
        </div>
    );

};