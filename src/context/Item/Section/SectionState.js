import React, { useReducer } from "react";
import axios from "axios";

import sectionReducer from "./SectionReducer";
import SectionContext from "./SectionContext";
import { GET_SECTIONS, ADD_SECTION, UPDATE_SECTION, DELETE_SECTION } from "./SectionTypes";

const initialState = {
    sections: []
};

export const SectionsContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(sectionReducer, initialState);

    const getSections = async () => {
        const response = await axios.get(
            'http://localhost:8080/section/getAll');

        dispatch({
            type: GET_SECTIONS,
            payload: response.data,
        });
    };

    const addSection = async (section) => {

        const response = await axios.post(
            'http://localhost:8080/section/add', section);
        
        console.log(response.data);

        dispatch({
            type: ADD_SECTION, 
            payload: section
        });
    };

    const updateSection = async (section) => {

        const updatedSection = {
            sectionId: section.sectionId,
            name: section.name,
            active: section.active,
            since: section.since,
            until: section.until,
            building: section.building,
            room: section.room,
            furniture: section.furniture
        }

        const response = await axios.put(
            'http://localhost:8080/section/update/' + section.sectionId, updatedSection);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_SECTION, 
            payload: updatedSection
        });
    };

    const deleteSection = async (sectionId) => {

        const response = await axios.delete('http://localhost:8080/section/delete/' + sectionId);

        console.log(response);
        
        dispatch({
            type: DELETE_SECTION,
            payload: sectionId,
        });

    };

    return (
        <SectionContext.Provider value={{ ...state, getSections, addSection, deleteSection, updateSection }}>
            {children}
        </SectionContext.Provider>
    )
};