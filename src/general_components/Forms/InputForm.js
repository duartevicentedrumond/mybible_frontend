import React from 'react';

import { Styled__Input } from "../../design/style";

export default function InputForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const placeholder = data.placeholder;
        const label = data.label;
        const id = data.id;

    return (
        <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
            <Styled__Input.Label>{label}</Styled__Input.Label>
            <Styled__Input.Input
                className="flex-fill"
                type="text"
                placeholder={placeholder}
                onChange={onChangeField}
                value={value}
                id={id}
            />
        </Styled__Input.Main>
    );

};