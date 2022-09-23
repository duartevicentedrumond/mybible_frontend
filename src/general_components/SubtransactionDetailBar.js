import React from 'react';
import { MdOutlineHouse, MdOutlineMeetingRoom } from "react-icons/md";
import { BiBed, BiLayout, BiFootball } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";

import { Styled } from "../design/style";

export default function SubtransactionDetailBar(data) {

    const object = data.object;
    const [buildings, rooms, furnitures, sections, boxes, items] = data.items;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            {object.building !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <MdOutlineHouse/><span>&nbsp;</span>
                    {
                        buildings.filter(building => {
                            if (String(building.buildingId) === String(object.building.buildingId)) {
                                return building;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {object.room !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <MdOutlineMeetingRoom/><span>&nbsp;</span>
                    {
                        rooms.filter(room => {
                            if (String(room.roomId) === String(object.room.roomId)) {
                                return room;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {object.furniture !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiBed/><span>&nbsp;</span>
                    {
                        furnitures.filter(furniture => {
                            if (String(furniture.furnitureId) === String(object.furniture.furnitureId)) {
                                return furniture;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {object.section !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiLayout/><span>&nbsp;</span>
                    {
                        sections.filter(section => {
                            if (String(section.sectionId) === String(object.section.sectionId)) {
                                return section;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {object.box !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BsBoxSeam/><span>&nbsp;</span>
                    {
                        boxes.filter(box => {
                            if (String(box.boxId) === String(object.box.boxId)) {
                                return box;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {object.item !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiFootball/><span>&nbsp;</span>
                    {
                        items.filter(item => {
                            if (String(item.itemId) === String(object.item.itemId)) {
                                return item;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
        </div>
    );

};