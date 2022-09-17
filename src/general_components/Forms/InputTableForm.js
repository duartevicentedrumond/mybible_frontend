import React from 'react';

import { Styled } from "../../design/style";

export default function InputTableForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const placeholder = data.placeholder;
        const id = data.id;

    return (
        <Styled.TableFormInput
            className="flex-fill"
            type="text"
            placeholder={placeholder}
            onChange={onChangeField}
            value={value}
            id={id}
        />
    );

};