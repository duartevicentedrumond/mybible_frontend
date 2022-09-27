import React, { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';

import { Styled } from "../../../design/style";
import { dateToString } from "./../../../general_components/Functions";
import BuildingTable from "../../Item/Building/components/BuildingTable";
import RoomTable from "../../Item/Room/components/RoomTable";
import FurnitureTable from "../../Item/Furniture/components/FurnitureTable";
import SectionTable from "../../Item/Section/components/SectionTable";
import BoxTable from "../../Item/Box/components/BoxTable";
import ItemTable from "../../Item/Item/components/ItemTable";

import ItemSelectionBar from "../../../general_components/ItemSelectionBar";
import SubtransactionDetailBar from "../../../general_components/SubtransactionDetailBar";

import InputForm from "../../../general_components/Forms/InputForm";
import SwitchForm from "../../../general_components/Forms/SwitchForm";
import DateForm from "../../../general_components/Forms/DateForm";
import SelectForm from "../../../general_components/Forms/SelectForm";

import SelectSubtransactionByTransactionModal from "../../Transaction/Components/SelectSubtransactionByTransactionModal";
import SubtransactionsByTransactionTable from "../../Transaction/Components/SubtransactionsByTransactionTable";
import SelectPersonModal from "../../Person/components/SelectPersonModal";
import PersonTable from "../../Person/components/PersonTable";

import { IoCloseCircleOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { RiParentLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";
import { IoAdd, IoSync } from "react-icons/io5";

export default function AddGiftModal(data) {

    //define initial given variables
    const showModal = data.showModal;
    const handleCloseModal = data.handleCloseModal;
    const people = data.People;
    const person = data.Person;
    const items = data.Items;
    const boxes = data.Boxes;
    const sections = data.Sections;
    const furnitures = data.Furnitures;
    const rooms = data.Rooms;
    const buildings = data.Buildings;
    const gifttypes = data.Gifttypes;
    const subtransactionsByTransaction = data.Transactions;
    const [giftInitial, addGift, updateGift] = data.Gifts;

    //set state for gift
    const [gift, setGift] = useState({
        value: null,
        date: dateToString(new Date()),
        description: null,
        from: true,
        people: [],
        gifttype: { gifttypeId: 1 },
        building: null,
        room: null,
        furniture: null,
        section: null,
        box: null,
        item: null,
        subtransaction: null
    });

    //people modal
    const [showAddPeople, setShowAddPeople] = useState(false);
    function handleShowAddPeople(e) {
        setShowAddPeople(true);
    };
    function handleHideAddPeople() {
        setShowAddPeople(false);
    };

    //transaction modal
    const [showAddTransaction, setShowAddTransaction] = useState(false);
    function handleShowAddTransaction(e) {
        setShowAddTransaction(true);
    };
    function handleHideAddTransaction() {
        setShowAddTransaction(false);
    };

    function handleDescriptionChange(e) {

        setGift(existingGift => ({
            ...existingGift,
            description: e.target.value
        }));

    };

    function handleFromChange(e) {
        setGift(existingGift => ({
            ...existingGift,
            from: e.target.checked
        }));
    };

    function handleDateChange(date) {

        const dateString = dateToString(date);

        setGift(existingGift => ({
            ...existingGift,
            date: dateString
        }));
    };

    function handleValueChange(e) {

        setGift(existingGift => ({
            ...existingGift,
            value: e.target.value
        }));

    };

    function onBuildingClick(e) {

        //prevent page refresh
        e.preventDefault();

        const buildingId = e.target.dataset.buildingid;

        setGift(existingGift => ({
            ...existingGift,
            building: { buildingId: buildingId },
            room: null,
            furniture: null,
            section: null,
            box: null,
            item: null
        }));

    };

    function onRoomClick(e) {

        //prevent page refresh
        e.preventDefault();

        const roomId = e.target.dataset.roomid;
        setGift(existingGift => ({
            ...existingGift,
            building: null,
            room: { roomId: roomId },
            furniture: null,
            section: null,
            box: null,
            item: null
        }));

    };

    function onFurnitureClick(e) {

        //prevent page refresh
        e.preventDefault();

        const furnitureId = e.target.dataset.furnitureid;
        setGift(existingGift => ({
            ...existingGift,
            building: null,
            room: null,
            furniture: { furnitureId: furnitureId },
            section: null,
            box: null,
            item: null
        }));

    };

    function onSectionClick(e) {

        //prevent page refresh
        e.preventDefault();

        const sectionId = e.target.dataset.sectionid;
        setGift(existingGift => ({
            ...existingGift,
            building: null,
            room: null,
            furniture: null,
            section: { sectionId: sectionId },
            box: null,
            item: null
        }));

    };

    function onBoxClick(e) {

        //prevent page refresh
        e.preventDefault();

        const boxId = e.target.dataset.boxid;
        setGift(existingGift => ({
            ...existingGift,
            building: null,
            room: null,
            furniture: null,
            section: null,
            box: { boxId: boxId },
            item: null
        }));

    };

    function onItemClick(e) {

        //prevent page refresh
        e.preventDefault();

        const itemId = e.target.dataset.itemid;
        setGift(existingGift => ({
            ...existingGift,
            building: null,
            room: null,
            furniture: null,
            section: null,
            box: null,
            item: { itemId: itemId }
        }));
    };

    function onSubtransactionClick(e) {

        //prevent page refresh
        e.preventDefault();

        const subtransactionId = e.target.dataset.subtransactionid;
        const customId = e.target.dataset.customid;
        setGift(existingGift => ({
            ...existingGift,
            subtransaction: {
                subtransactionId: subtransactionId,
                customId: customId
            }
        }));
    };

    function onPersonClick(e) {

        //prevent page refresh
        e.preventDefault();

        const personId = e.target.dataset.personid;
        const nickname = e.target.dataset.nickname;
        setGift(existingGift => ({
            ...existingGift,
            people: [
                ...existingGift.people,
                {
                    personId: personId,
                    nickname: nickname
                }
            ]
        }));
    };

    function handlePeopleDelete(e) {

        //prevent page refresh
        e.preventDefault();

        setGift(existingGift => ({
            ...existingGift,
            people: []
        }));
    };

    function handleGifttypeChange(e) {

        setGift(existingGift => ({
            ...existingGift,
            gifttype: { gifttypeId: e.target.value }
        }));
    };

    //saves gift
    function handleSubmit(e) {

        e.preventDefault();

        //if gift already exists updates it
        if (gift.giftId) {
            updateGift(gift);
            handleCloseModal();
        }
        else { //if item doesn't exist adds new
            addGift(gift);
            handleCloseModal();
        }
    };

    //run on the first render and anytime any dependency value changes
    useEffect(() => {
        //if it is an existing gift, renders info
        if (giftInitial) {

            //retrieves people's nicknames from gift
            giftInitial.people.map((person) => {
                const filteredPeople = people.filter( (filteredPerson) => {
                    if (String(filteredPerson.personId) === String(person.personId)) {
                        return filteredPerson;
                    };
                })[0];
                person.personId = filteredPeople.personId;
                person.nickname = filteredPeople.nickname;
            });
            setGift(giftInitial);
        } else { //if not, sets existing person page to gift
            setGift(existingGift => ({
                ...existingGift,
                people: [
                    {
                        personId: person.personId,
                        nickname: person.nickname
                    }
                ]
            }));
        };
    }, [person, giftInitial, people]); //page first rendering dependency

    return (

        <Modal
            show={showModal}
            size="lg"
        >
            <Modal.Header>
                <Modal.Title>
                    <Styled.Title className='d-inline-flex flex-row align-items-center'>
                        {giftInitial ?
                            <div>Update gift#{giftInitial.giftId}</div> :
                            <div>Add new gift</div>
                        }
                    </Styled.Title>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">

                    {/*add subtransaction modal*/}
                    <div className="d-inline-flex flex-row align-items-center py-0">
                        <Styled.TitleButton
                            onClick={handleShowAddTransaction} className='d-flex'
                            style={{ fontSize: "18px" }}
                        >
                            <MdOutlineAttachMoney />
                        </Styled.TitleButton>
                        {gift.subtransaction !== null ?
                            <Styled.InfoText>
                                #{gift.subtransaction.subtransactionId}
                            </Styled.InfoText>
                            : null}
                    </div>

                    {/*add people modal*/}
                    <div className="d-inline-flex flex-row align-items-center py-0">
                        <Styled.TitleButton
                            onClick={handleShowAddPeople} className='d-flex'
                            style={{ fontSize: "18px" }}
                        >
                            <RiParentLine />
                        </Styled.TitleButton>
                        {gift.people.length > 0 ?
                            <div className="d-inline-flex flex-row align-items-center py-0">
                                {gift.people.map(
                                    (person) => (
                                        <Styled.InfoText
                                            className='me-2'
                                        >
                                            {person.nickname}
                                        </Styled.InfoText>
                                    )
                                )}
                                <Styled.TitleButton
                                    onClick={handlePeopleDelete} className='d-flex'
                                    style={{ fontSize: "18px" }}
                                >
                                    <FiX />
                                </Styled.TitleButton>
                            </div>
                            : null
                        }
                    </div>

                    <SubtransactionDetailBar
                        object={gift}
                        items={[buildings, rooms, furnitures, sections, boxes, items]}
                    />

                    <ItemSelectionBar
                        Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e)]}
                        Room={[false, RoomTable, rooms, (e) => onRoomClick(e)]}
                        Furniture={[false, FurnitureTable, furnitures, (e) => onFurnitureClick(e)]}
                        Section={[false, SectionTable, sections, (e) => onSectionClick(e)]}
                        Box={[false, BoxTable, boxes, (e) => onBoxClick(e)]}
                        Item={[false, ItemTable, items, (e) => onItemClick(e)]}
                        remove={[true, false]}
                    />

                    {/*gift description input form*/}
                    <InputForm
                        value={gift.description}
                        onChangeField={handleDescriptionChange}
                        placeholder="description..."
                        label="description"
                    />

                    {/*gift from/to input form*/}
                    <SwitchForm
                        value={gift.from}
                        onChangeField={handleFromChange}
                        label={["from", "to"]}
                    />

                    {/*gift date input form*/}
                    <DateForm
                        value={gift.date}
                        onChangeField={(date) => handleDateChange(date)}
                        placeholder="date..."
                        label="date"
                    />

                    {/*gift value input form*/}
                    <InputForm
                        value={gift.value}
                        onChangeField={handleValueChange}
                        placeholder="value..."
                        label="value"
                    />

                    {/* subtransaction's category input' */}
                    <SelectForm
                        value={gift.gifttype.gifttypeId}
                        arrayList={gifttypes}
                        arrayValue="gifttypeId"
                        arrayDescription="description"
                        onChangeField={handleGifttypeChange}
                        label="type"
                    />

                    {/*Change upload button icon wether the it's a new item or an existing item*/}
                    <div className="d-inline-flex flex-row align-items-center">
                        <Styled.TitleButton onClick={handleSubmit} className='d-flex'>
                            {gift.giftId ?
                                <IoSync /> :
                                <IoAdd />
                            }
                        </Styled.TitleButton>
                    </div>

                    <SelectSubtransactionByTransactionModal
                        showModal={showAddTransaction}
                        handleCloseModal={handleHideAddTransaction}
                        Transactions={subtransactionsByTransaction}
                        SubtransactionsByTransactionTable={SubtransactionsByTransactionTable}
                        OnSubtransactionClick={onSubtransactionClick}
                    />

                    <SelectPersonModal
                        showModal={showAddPeople}
                        handleCloseModal={handleHideAddPeople}
                        people={people}
                        PersonTable={PersonTable}
                        onPersonClick={onPersonClick}
                    />

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Styled.TitleButton
                    onClick={handleCloseModal}
                >
                    <IoCloseCircleOutline />
                </Styled.TitleButton>
            </Modal.Footer>
        </Modal>

    )

};