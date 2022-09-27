import React from 'react';

import { Styled } from "../../design/style";

export default function SwitchForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const [labelTrue, labelFalse] = data.label;
        const id = data.id;

    return (
        <div
            className="d-flex flex-row align-items-baseline form-switch ps-2"
        >
            <Styled.FormLabel>
                {value ?
                    labelTrue :
                    labelFalse
                }
            </Styled.FormLabel>
            <Styled.FormSwitch
                className="form-check-input ms-2"
                type="checkbox"
                role="switch"
                onChange={onChangeField}
                checked={value}
                id={id}
            />
        </div>
    );

};