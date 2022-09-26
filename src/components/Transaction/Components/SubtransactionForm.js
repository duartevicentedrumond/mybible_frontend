import React, { useContext, useEffect } from 'react';
import { IoCloseCircleOutline, IoReturnDownForwardOutline } from "react-icons/io5";

import CategoryContext from "../../../context/Wallet/Category/CategoryContext";
import PersonContext from "../../../context/Person/Person/PersonContext";
import BuildingContext from "../../../context/Item/Building/BuildingContext";
import RoomContext from "../../../context/Item/Room/RoomContext";
import FurnitureContext from "../../../context/Item/Furniture/FurnitureContext";
import SectionContext from "../../../context/Item/Section/SectionContext";
import BoxContext from "../../../context/Item/Box/BoxContext";
import ItemContext from "../../../context/Item/Item/ItemContext";

import { Styled } from "../../../design/style";
import InputForm from "../../../general_components/Forms/InputForm";
import SelectForm from "../../../general_components/Forms/SelectForm";
import ItemSelectionBar from "../../../general_components/ItemSelectionBar";
import SubtransactionDetailBar from "../../../general_components/SubtransactionDetailBar";

import BuildingTable from "../../Item/Building/components/BuildingTable";
import RoomTable from "../../Item/Room/components/RoomTable";
import FurnitureTable from "../../Item/Furniture/components/FurnitureTable";
import SectionTable from "../../Item/Section/components/SectionTable";
import BoxTable from "../../Item/Box/components/BoxTable";
import ItemTable from "../../Item/Item/components/ItemTable";

export default function SubtransactionsForm(data) {

    //define initial variables
    const transaction = data.transaction;
    const setTransaction = data.setTransaction;

    //get context for category, people, building, room, furniture, section, box and item
    const { categories, getCategories } = useContext(CategoryContext);

    const { people, getPeople } = useContext(PersonContext);

    const { buildings, getBuildings } = useContext(BuildingContext);

    const { rooms, getRooms } = useContext(RoomContext);

    const { furnitures, getFurnitures } = useContext(FurnitureContext);

    const { sections, getSections } = useContext(SectionContext);

    const { boxes, getBoxes } = useContext(BoxContext);

    const { items, getItems } = useContext(ItemContext);

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        //retrieve existing subtransaction categories and people
        getCategories();
        getPeople();
        getBuildings();
        getRooms();
        getFurnitures();
        getSections();
        getBoxes();
        getItems();

    }
        , []); //no dependencies

    //udpate transaction state when subtransaction amount input changes
    function handleAmountChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(e.target.id)) {
                subtransaction.amount = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));
    };

    //udpate transaction state when subtransaction category input changes
    function handleCategoryChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(e.target.id)) {
                subtransaction.category.categoryId = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));
    };

    //udpate transaction state when subtransaction person input changes
    function handlePersonChange(e) {

        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(e.target.id)) {
                subtransaction.person.personId = e.target.value;
            }
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));
    };

    function onBuildingClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const buildingId = e.target.dataset.buildingid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    building: { buildingId: buildingId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function onRoomClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const roomId = e.target.dataset.roomid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    room: { roomId: roomId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function onFurnitureClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const furnitureId = e.target.dataset.furnitureid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    furniture: { furnitureId: furnitureId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function onSectionClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const sectionId = e.target.dataset.sectionid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {
            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    section: { sectionId: sectionId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function onBoxClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const boxId = e.target.dataset.boxid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {

            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    box: { boxId: boxId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function onItemClick(e, index) {

        //prevent page refresh
        e.preventDefault();

        const itemId = e.target.dataset.itemid;
        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {

            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    item: { itemId: itemId }
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    function handleRemove(e, index) {

        //prevent page refresh
        e.preventDefault();

        const updatedSubtransactions = transaction.subtransactions.map((subtransaction, i) => {

            if (i === parseFloat(index)) {
                subtransaction = Object.assign(subtransaction, {
                    item: null,
                    box: null,
                    section: null,
                    furniture: null,
                    room: null,
                    building: null
                });
            };
            return subtransaction;
        });

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: updatedSubtransactions
        }));

    };

    //update transaction state with new subtransaction
    function addSubtransaction(e) {

        //prevents page refresh on click
        e.preventDefault();

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: [
                ...existingTransaction.subtransactions,
                {
                    amount: null,
                    category: { categoryId: '1' },
                    person: { personId: '0' },
                    building: null,
                    room: null,
                    furniture: null,
                    section: null,
                    box: null,
                    item: null
                }
            ]
        }));

    };

    //update transaction state by deleting existing subtransaction
    function deleteSubtransaction(e) {

        //prevents page refresh on click
        e.preventDefault();

        console.log()

        setTransaction(existingTransaction => ({
            ...existingTransaction,
            subtransactions: existingTransaction.subtransactions.filter(
                (subtransaction, index) => parseFloat(index) !== parseFloat(e.target.id)
            )
        }));
    };

    return (

        <div className='py-3 ps-2'>

            {/*transaction subtransactions input form*/}
            {transaction.subtransactions.map((subtransaction, index) => (

                <div>

                    <hr className="my-1" />

                    <div className="row">

                        {/* delete subtransaction button */}
                        <div className="col-auto d-flex align-items-center px-1">
                            <Styled.TitleButton
                                onClick={deleteSubtransaction}
                            >
                                <IoCloseCircleOutline id={index} />
                            </Styled.TitleButton>
                        </div>

                        {/* subtransaction form */}
                        <div className="col px-1">

                            <SubtransactionDetailBar
                                object={subtransaction}
                                items={[buildings, rooms, furnitures, sections, boxes, items]}
                            />

                            <ItemSelectionBar
                                Building={[false, BuildingTable, buildings, (e) => onBuildingClick(e, index)]}
                                Room={[false, RoomTable, rooms, (e) => onRoomClick(e, index)]}
                                Furniture={[false, FurnitureTable, furnitures, (e) => onFurnitureClick(e, index)]}
                                Section={[false, SectionTable, sections, (e) => onSectionClick(e, index)]}
                                Box={[false, BoxTable, boxes, (e) => onBoxClick(e, index)]}
                                Item={[false, ItemTable, items, (e) => onItemClick(e, index)]}
                                index={index}
                                remove={[false, (e) => handleRemove(e, index)]}
                            />

                            {/* subtransaction's amount input' */}
                            <InputForm
                                value={subtransaction.amount}
                                onChangeField={handleAmountChange}
                                placeholder="amount..."
                                label="amount"
                                id={index}
                            />

                            {/* subtransaction's category input' */}
                            <SelectForm
                                value={subtransaction.category.categoryId}
                                arrayList={categories}
                                arrayValue="categoryId"
                                arrayDescription="description"
                                onChangeField={handleCategoryChange}
                                label="category"
                                id={index}
                            />

                            {/* subtransaction's person input' */}
                            <SelectForm
                                value={subtransaction.person.personId}
                                arrayList={people}
                                arrayValue="personId"
                                arrayDescription="nickname"
                                onChangeField={handlePersonChange}
                                label="person"
                                id={index}
                            />

                        </div>
                    </div>
                </div>
            ))}

            {/*add new subtransactions button*/}
            <div className="row">
                <div className="col-auto d-flex align-items-center px-0">
                    <Styled.TitleButton
                        onClick={addSubtransaction}
                        className='align-items-start px-1'
                    >
                        <IoReturnDownForwardOutline />
                    </Styled.TitleButton>
                </div>
            </div>

        </div>

    )

};