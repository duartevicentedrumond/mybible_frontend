import React from 'react';

import { Styled__Input } from "../../design/style";

export default function CheckForm(data) {

    //split input data through different objects
        const value = data.value;
        const onChangeField = data.onChangeField;
        const id = data.id;
        const description = data.description;
        const fieldChecked = data.fieldChecked;
        const disable = data.disable;

    return (
        <div className="form-check">
            <input 
                className="form-check-input"
                type="checkbox"
                name="types"
                id={id}
                checked={fieldChecked}
                value={value}
                onChange={onChangeField}
                disabled={!disable}
            />
            <label className="form-check-label">
                {description}
            </label>
        </div>
    );

};