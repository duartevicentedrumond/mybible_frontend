import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

import { IconChristmasTree, IconTransferIn, IconTransferOut, IconCake, IconReceipt2 } from '@tabler/icons';
import { Styled__Title } from "../../../design/style";

export default function GiftInfo(data) {

    const giftsByPerson = data.GiftsByPerson;

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

    //run on the first render and anytime any dependency value changes
    useEffect(() => {

        const giftsFiltered = giftsByPerson.filter(
            gift => {
                if (String(gift.personId) === String(params.id)) {
                    return gift
                }
            }
        );

        if (giftsFiltered.length > 0) {
            setFilteredGifts(giftsFiltered);
        }

    }, [giftsByPerson, params]); //page first rendering dependency

    return (
        filteredGifts.length > 0 ?
            <div className="flex">
                <Styled__Title.InfoTitle className='pb-0 d-flex justify-content-between'>
                    {console.log(filteredGifts)}
                    <span>Gifts</span>
                </Styled__Title.InfoTitle>
                {filteredGifts.map((gift) => {
                    return (
                        <Styled__Title.InfoItem className='d-flex flex-row align-items-center pb-0' key={gift.giftId}>
                            { gift.from ?
                                <IconTransferIn/>
                            : <IconTransferOut/>}
                            { gift.gifttypeDescription === "christmas" ?
                                <IconChristmasTree/>
                            : null}
                            { gift.gifttypeDescription === "anniversary" ?
                                <IconCake/>
                            : null}
                            { gift.gifttypeDescription === "contribution" ?
                                <IconReceipt2/>
                            : null}
                            <span>{gift.description}</span>
                        </Styled__Title.InfoItem>
                    );
                })}
            </div>
        : null
    )
}