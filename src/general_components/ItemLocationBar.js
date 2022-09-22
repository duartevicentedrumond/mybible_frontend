import React from 'react';

import { Styled } from "../design/style";

export default function ItemLocationBar(data) {

    const location = data.location;
    const type = data.type;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            {location.building.buildingId && type !== 'building' ?
                <Styled.InfoText>{location.building.name}</Styled.InfoText>
                : null
            }
            {location.room.roomId && type !== 'room' ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.room.name}</Styled.InfoText>
                : null
            }
            {location.furniture.furnitureId && type !== 'furniture' ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.furniture.name}</Styled.InfoText>
                : null
            }
            {location.section.sectionId && type !== 'section'  ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.section.name}</Styled.InfoText>
                : null
            }
            {location.box.boxId && type !== 'box' ?
                <Styled.InfoText
                    className='ps-1'    
                >{' > '}{location.box.name}</Styled.InfoText>
                : null
            }
        </div>
    );

};