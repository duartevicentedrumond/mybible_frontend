import React from 'react';

import { Styled__Input } from "../design/style";

const InputForm = (data) => {

    //split input data through different objects
    const object = data.object;
    const setObject = data.setObject;
    const name = data.name;

    const handleChange = e => {

        //set to object field value from input
        object[e.target.name] = e.target.value;
    
        //update the state of given object to the updated value from input
        setObject({...object, object});
    };

    return (
        <Styled__Input.Main className="d-flex flex-row align-items-baseline py-1">
            <Styled__Input.Label>{name}</Styled__Input.Label>
            <Styled__Input.Input
                className="flex-fill"
                type="text"
                name={name}
                placeholder={name + "..."}
                onChange={handleChange}
                value={object[name]}
            />
        </Styled__Input.Main>
    );

};

export default InputForm;