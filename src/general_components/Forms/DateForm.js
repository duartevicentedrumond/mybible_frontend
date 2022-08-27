import React from 'react';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Styled__Input } from "../../design/style";

export default function DateForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const label = data.label;

    return (
        <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
            <Styled__Input.Label>{label}</Styled__Input.Label>
            <DatePicker 
                selected={new Date(value)} 
                onChange={(date)=>onChangeField(date)}
                showYearDropdown
                dateFormat="yyyy-MM-dd"
            />
        </Styled__Input.Main>
    );

};