import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { dateToString } from "../../../general_components/Functions";
import { getLocation } from "../../../general_components/ItemFunctions";
import { Styled } from "../../../design/style";

import ItemContext from "../../../context/Item/Item/ItemContext";
import BoxContext from "../../../context/Item/Box/BoxContext";
import SectionContext from "../../../context/Item/Section/SectionContext";
import FurnitureContext from "../../../context/Item/Furniture/FurnitureContext";
import RoomContext from "../../../context/Item/Room/RoomContext";
import BuildingContext from "../../../context/Item/Building/BuildingContext";

import RoomForm from './RoomForm';

export default function RoomView() {

    //get item, box, section, furniture, room and building context context
    const { items, getItems } = useContext(ItemContext);
    const { boxes, getBoxes } = useContext(BoxContext);
    const { sections, getSections } = useContext(SectionContext);
    const { furnitures, getFurnitures } = useContext(FurnitureContext);
    const { rooms, getRooms, addRoom, updateRoom } = useContext(RoomContext);
    const { buildings, getBuildings } = useContext(BuildingContext);

    //get parameters from url
    const params = useParams();

    //set room state
    const [room, setRoom] = useState({
        roomId: null,
        name: null,
        active: true,
        since: dateToString(new Date()),
        until: null,
        building: null
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
        getItems();
        getBoxes();
        getSections();
        getFurnitures();
        getBuildings();

        //get room (if it exists) from the url id
        const roomFound = rooms.find((room) => room.roomId === parseFloat(params.id));

        if (roomFound) {
            //set room state to the values from url id
            setRoom(roomFound);
            getLocation(
                [location, setLocation],
                [buildings, rooms, furnitures, sections, boxes, items],
                params.id,
                'room'
            );
        };

    }, [rooms]); //page first rendering depends on params.id and transactions

    return (
        <div
            className="d-flex flex-column text-start py-3 px-0"
        >
            {/*transaction form title*/}
            <div className="d-inline-flex flex-row align-items-center ps-2">
                {/*show item title*/}
                <Styled.Title className='d-flex pe-2'>
                    {'Room #' + room.roomId}
                </Styled.Title>
            </div>

            { room.roomId ? 
                <RoomForm
                    items={[items, boxes, sections, furnitures, rooms, addRoom, updateRoom, buildings]}
                    room={room}
                />
            : null }
        </div>

    )

};