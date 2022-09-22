import React from 'react';
import { MdOutlineHouse, MdOutlineMeetingRoom } from "react-icons/md";
import { BiBed, BiLayout, BiFootball } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";

import { Styled } from "../design/style";

export default function SubtransactionDetailBar(data) {

    const subtransaction = data.subtransaction;
    const [buildings, rooms, furnitures, sections, boxes, items] = data.items;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            {subtransaction.building !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <MdOutlineHouse/><span>&nbsp;</span>
                    {
                        buildings.filter(building => {
                            if (String(building.buildingId) === String(subtransaction.building.buildingId)) {
                                return building;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {subtransaction.room !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <MdOutlineMeetingRoom/><span>&nbsp;</span>
                    {
                        rooms.filter(room => {
                            if (String(room.roomId) === String(subtransaction.room.roomId)) {
                                return room;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {subtransaction.furniture !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiBed/><span>&nbsp;</span>
                    {
                        furnitures.filter(furniture => {
                            if (String(furniture.furnitureId) === String(subtransaction.furniture.furnitureId)) {
                                return furniture;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {subtransaction.section !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiLayout/><span>&nbsp;</span>
                    {
                        sections.filter(section => {
                            if (String(section.sectionId) === String(subtransaction.section.sectionId)) {
                                return section;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {subtransaction.box !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BsBoxSeam/><span>&nbsp;</span>
                    {
                        boxes.filter(box => {
                            if (String(box.boxId) === String(subtransaction.box.boxId)) {
                                return box;
                            }
                        })[0].name
                    }
                    <span>&nbsp;</span>
                </Styled.InfoText>
                : null
            }
            {subtransaction.item !== null ?
                <Styled.InfoText
                    className='d-flex flex-row align-items-center'
                >
                    <BiFootball/><span>&nbsp;</span>
                    {
                        items.filter(item => {
                            if (String(item.itemId) === String(subtransaction.item.itemId)) {
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