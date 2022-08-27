import React from 'react';

import { Styled } from "../../design/style";

export default function InputForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const placeholder = data.placeholder;
        const label = data.label;
        const id = data.id;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            <Styled.FormLabel>{label}</Styled.FormLabel>
            <Styled.FormInput
                className="flex-fill"
                type="text"
                placeholder={placeholder}
                onChange={onChangeField}
                value={value}
                id={id}
            />
        </div>
    );

};