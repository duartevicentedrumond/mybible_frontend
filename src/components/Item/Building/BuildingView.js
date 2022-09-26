import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "../../../general_components/Functions";
import { getLocation } from "../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import BuildingForm from './BuildingForm';

export default function BuildingView(data) {

    const items = data.Items;
    const boxes = data.Boxes;
    const sections = data.Sections;
    const furnitures = data.Furnitures;
    const rooms = data.Rooms;
    const [buildings, addBuilding, updateBuilding] = data.Buildings;

    //get parameters from url
    const params = useParams();

    //set building state
    const [building, setBuilding] = useState({
        buildingId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null
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

        //get building (if it exists) from the url id
        const buildingFound = buildings.find((building) => building.buildingId === parseFloat(params.id));

        if (buildingFound) {
            //set building state to the values from url id
            setBuilding(buildingFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'building'
            );
        };

    }, [buildings]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Building #' + building.buildingId}
                </Styled.Title>
            </div>

            { building.buildingId ? 
                <BuildingForm
                    items={[items, boxes, sections, furnitures, rooms, buildings, addBuilding, updateBuilding]}
                    building={building}
                />
            : null }
        </div>

    )

};