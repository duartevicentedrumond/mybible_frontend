import React from 'react';

import { Styled } from "../../design/style";

export default function SelectForm(data) {

    //split input data through different objects
        const value = data.value;
        const arrayList = data.arrayList;
        const arrayValue = data.arrayValue;
        const arrayDescription = data.arrayDescription;
        const onChangeField = data.onChangeField;
        const label = data.label;
        const id = data.id;

    return (
        <div className="d-flex flex-row align-items-baseline  ps-2">
            <Styled.FormLabel>{label}</Styled.FormLabel>
            <Styled.FormSelect
                name="category"
                aria-label="category"
                id={id}
                value={value}
                onChange={onChangeField}
            >
                {arrayList.map( (element) => {

                    if (element['active']) { //only renders category if it is still active
                        return (
                            <option value={element[arrayValue]}>
                                {element[arrayDescription]}
                            </option>
                        )
                    }
                    
                })}
            </Styled.FormSelect>
        </div>
    );

};