import { useReducer } from "react";
import axios from "axios";

import personReducer from "./PersonReducer";
import PersonContext from "./PersonContext";
import { GET_PEOPLE, ADD_PERSON, UPDATE_PERSON, DELETE_PERSON } from "./PersonTypes";

const initialState = {
    people: []
};

export const PersonContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(personReducer, initialState);

    const getPeople = async () => {
        const response = await axios.get(
            'http://localhost:8080/person/getAll');

        dispatch({
            type: GET_PEOPLE,
            payload: response.data,
        });
    };

    const addPerson = async (person) => {

        const newPerson = person;

        const response = await axios.post(
            'http://localhost:8080/person/add', newPerson);
        
        console.log(response.data);

        dispatch({
            type: ADD_PERSON, 
            payload: newPerson
        });
    };

    const updatePerson = async (person) => {

        const updatedPerson = person;

        const response = await axios.put(
            'http://localhost:8080/person/update/' + updatedPerson.personId, updatedPerson);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_PERSON, 
            payload: updatedPerson
        });
    };

    const deletePerson = (id) => {
        
        dispatch({
            type: DELETE_PERSON,
            payload: id,
        });

    };

    return (
        <PersonContext.Provider value={{ ...state, getPeople, addPerson, deletePerson, updatePerson }}>
            {children}
        </PersonContext.Provider>
    )
};