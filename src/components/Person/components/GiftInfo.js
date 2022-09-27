import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { IconChristmasTree, IconTransferIn, IconTransferOut, IconCake, IconReceipt2 } from '@tabler/icons';
import { Styled, Styled__Title } from "../../../design/style";
import AddGiftModal from "../../Gift/components/AddGiftModal";
import { dateToString } from "../../../general_components/Functions";

export default function GiftInfo(data) {

    const people = data.People;
    const items = data.Items;
    const boxes = data.Boxes;
    const sections = data.Sections;
    const furnitures = data.Furnitures;
    const rooms = data.Rooms;
    const buildings = data.Buildings;
    const gifttypes = data.Gifttypes;
    const transactions = data.Transactions;
    const [addGift, updateGift, giftsByPerson, gifts] = data.Gifts;

    //get parameters from url
    const params = useParams();

    const [filteredGifts, setFilteredGifts] = useState([
        {
            giftId: null,
            date: null,
            description: null,
            from: true,
            value: null,
            nickname: null,
            gifttypeDescription: null,
            personId: null
        }
    ]);

    const [person, setPerson] = useState({
        nickname: null,
        fullName: null,
        birthday: dateToString(new Date()),
        age: null,
        starred: false
    });

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

    //gift modal
    const [showGiftModal, setShowGiftModal] = useState(false);
    function handleShowGiftModal(e) {

        e.preventDefault();

        const giftId = e.target.dataset.giftid;

        const giftFound = gifts.find((gift) => String(gift.giftId) === String(giftId));

        setGift(giftFound);
        setShowGiftModal(true);
    };
    function handleCloseGiftModal() {
        setShowGiftModal(false);
    };

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        //get person (if it exists) from the url id
        const personFound = people.find((person) => person.personId === parseFloat(params.id));

        // if person exists from url id
        if (personFound) {
            //set person state to the values from url id person
            setPerson(personFound);
        };

        const giftsFiltered = giftsByPerson.filter(
            gift => {
                if (String(gift.personId) === String(params.id)) {
                    return gift
                }
            }
        );

        if (giftsFiltered.length > 0) {
            setFilteredGifts(giftsFiltered);
        };

    }, [giftsByPerson, params, people]); //page first rendering dependency

    return (
        filteredGifts.length > 0 ?
            <div className="flex">
                <Styled__Title.InfoTitle className='pb-0 d-flex justify-content-between'>
                    <span>Gifts</span>
                </Styled__Title.InfoTitle>
                {filteredGifts.map((gift) => {
                    return (
                        <Styled.InfoLink
                            className='d-flex flex-row align-items-baseline pb-0'
                            key={gift.giftId}
                            to={'#'}
                            data-giftid={gift.giftId}
                            onClick={handleShowGiftModal}
                        >
                            {gift.from ?
                                <IconTransferIn
                                    data-giftid={gift.giftId}
                                />
                                :
                                <IconTransferOut  
                                    data-giftid={gift.giftId}
                                />
                            }
                            {gift.gifttypeDescription === "christmas" ?
                                <IconChristmasTree
                                    data-giftid={gift.giftId}
                                />
                                : null
                            }
                            {gift.gifttypeDescription === "anniversary" ?
                                <IconCake
                                    data-giftid={gift.giftId}
                                />
                                : null
                            }
                            {gift.gifttypeDescription === "contribution" ?
                                <IconReceipt2
                                    data-giftid={gift.giftId}
                                />
                                : null
                            }
                            {gift.value ?
                                <span
                                    data-giftid={gift.giftId}
                                >
                                    &nbsp;{gift.date} | {(gift.value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}€ | {gift.description}
                                </span>
                                : null
                            }
                        </Styled.InfoLink>
                    );
                })}

                <AddGiftModal
                    showModal={showGiftModal}
                    handleCloseModal={handleCloseGiftModal}
                    Person={person}
                    People={people}
                    Items={items}
                    Boxes={boxes}
                    Sections={sections}
                    Furnitures={furnitures}
                    Rooms={rooms}
                    Buildings={buildings}
                    Gifttypes={gifttypes}
                    Transactions={transactions}
                    Gifts={[gift, addGift, updateGift]}
                />
            </div>
            : null
    )
}