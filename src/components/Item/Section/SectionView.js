import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "../../../general_components/Functions";
import { getLocation } from "../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import SectionForm from './SectionForm';

export default function SectionView(data) {

    const items = data.Items;
    const boxes = data.Boxes;
    const [sections, addSection, updateSection] = data.Sections;
    const furnitures = data.Furnitures;
    const rooms = data.Rooms;
    const buildings = data.Buildings;

    //get parameters from url
    const params = useParams();

    //set section state
    const [section, setSection] = useState({
        sectionId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null,
        building: null,
        room: null,
        furniture: null
    });

    const newLocation = {
        building: {
            buildingId: null,
            name: null
        },
        room: {
            roomId: null,
            name: null
        },
        furniture: {
            furnitureId: null,
            name: null
        },
        section: {
            sectionId: null,
            name: null
        },
        box: {
            boxId: null,
            name: null
        }
    }

    const [location, setLocation] = useState(newLocation);

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        //get section (if it exists) from the url id
        const sectionFound = sections.find((section) => section.sectionId === parseFloat(params.id));

        if (sectionFound) {
            //set section state to the values from url id
            setSection(sectionFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'section'
            );
        };

    }, [sections]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Section #' + section.sectionId}
                </Styled.Title>
            </div>

            { section.sectionId ? 
                <SectionForm
                    items={[items, boxes, sections, addSection, updateSection, furnitures, rooms, buildings]}
                    section={section}
                />
            : null }
        </div>

    )

};