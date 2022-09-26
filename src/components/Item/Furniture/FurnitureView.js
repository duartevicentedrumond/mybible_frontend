import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "../../../general_components/Functions";
import { getLocation } from "../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import FurnitureForm from './FurnitureForm';

export default function FurnitureView(data) {

    const items = data.Items;
    const boxes = data.Boxes;
    const sections = data.Sections;
    const [furnitures, addFurniture, updateFurniture] = data.Furnitures;
    const rooms = data.Rooms;
    const buildings = data.Buildings;

    //get parameters from url
    const params = useParams();

    //set furniture state
    const [furniture, setFurniture] = useState({
        furnitureId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null,
        building: null,
        room: null
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

        //get furniture (if it exists) from the url id
        const furnitureFound = furnitures.find((furniture) => furniture.furnitureId === parseFloat(params.id));

        if (furnitureFound) {
            //set furniture state to the values from url id
            setFurniture(furnitureFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'furniture'
            );
        };

    }, [furnitures]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Furniture #' + furniture.furnitureId}
                </Styled.Title>
            </div>

            { furniture.furnitureId ? 
                <FurnitureForm
                    items={[items, boxes, sections, furnitures, addFurniture, updateFurniture, rooms, buildings]}
                    furniture={furniture}
                />
            : null }
        </div>

    )

};