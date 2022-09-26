import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "../../../general_components/Functions";
import { getLocation } from "../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import BoxForm from './BoxForm';

export default function BoxView(data) {

    const items = data.Items;
    const [boxes, addBox, updateBox] = data.Boxes;
    const sections = data.Sections;
    const furnitures = data.Furnitures;
    const rooms = data.Rooms;
    const buildings = data.Buildings;

    //get parameters from url
    const params = useParams();

    //set box state
    const [box, setBox] = useState({
        boxId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null,
        building: null,
        room: null,
        furniture: null,
        section: null
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

        //get box (if it exists) from the url id
        const boxFound = boxes.find((box) => box.boxId === parseFloat(params.id));

        if (boxFound) {
            //set box state to the values from url id
            setBox(boxFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'box'
            );
        };

    }, [boxes]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Box #' + box.boxId}
                </Styled.Title>
            </div>

            { box.boxId ? 
                <BoxForm
                    items={[items, boxes, addBox, updateBox, sections, furnitures, rooms, buildings]}
                    box={box}
                />
            : null }
        </div>

    )

};