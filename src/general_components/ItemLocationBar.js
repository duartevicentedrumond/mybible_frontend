import React from 'react';

import { Styled } from "../design/style";

export default function ItemLocationBar(data) {

    const location = data.location;

    return (
        <div className="d-flex flex-row align-items-baseline ps-2">
            {location.building.buildingId ?
                <Styled.InfoText>{location.building.name}</Styled.InfoText>
                : null
            }
            {location.room.roomId ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.room.name}</Styled.InfoText>
                : null
            }
            {location.furniture.furnitureId ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.furniture.name}</Styled.InfoText>
                : null
            }
            {location.section.sectionId ?
                <Styled.InfoText
                    className='ps-1'
                >{' > '}{location.section.name}</Styled.InfoText>
                : null
            }
            {location.box.boxId ?
                <Styled.InfoText
                    className='ps-1'    
                >{' > '}{location.box.name}</Styled.InfoText>
                : null
            }
        </div>
    );

};