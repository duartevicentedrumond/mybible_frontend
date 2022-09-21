import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "./../../../general_components/Functions";
import { getLocation } from "./../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import ItemContext from "../../../context/Item/Item/ItemContext";
import BoxContext from "../../../context/Item/Box/BoxContext";
import SectionContext from "../../../context/Item/Section/SectionContext";
import FurnitureContext from "../../../context/Item/Furniture/FurnitureContext";
import RoomContext from "../../../context/Item/Room/RoomContext";
import BuildingContext from "../../../context/Item/Building/BuildingContext";
import ItemLocationBar from "./../../../general_components/ItemLocationBar";

import ItemForm from "./ItemForm";

export default function ItemView() {

    //get item, box, section, furniture, room and building context context
    const { items, getItems, addItem, updateItem } = useContext(ItemContext);
    const { boxes, getBoxes } = useContext(BoxContext);
    const { sections, getSections } = useContext(SectionContext);
    const { furnitures, getFurnitures } = useContext(FurnitureContext);
    const { rooms, getRooms } = useContext(RoomContext);
    const { buildings, getBuildings } = useContext(BuildingContext);

    //get parameters from url
    const params = useParams();

    //set item state
    const [item, setItem] = useState({
        itemId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null,
        building: null,
        room: null,
        furniture: null,
        section: null,
        box: null
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

        getBoxes();
        getSections();
        getFurnitures();
        getRooms();
        getBuildings();

        //get transaction (if it exists) from the url id
        const itemFound = items.find((item) => item.itemId === parseFloat(params.id));

        if (itemFound) {
            //set item state to the values from url id
            setItem(itemFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'item'
            );
        };

    }, [items]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Item #' + item.itemId}
                </Styled.Title>
            </div>

            { item.itemId ? <ItemForm
                items={[items, addItem, updateItem, boxes, sections, furnitures, rooms, buildings]}
                item={item}
            /> : null }
        </div>

    )

};