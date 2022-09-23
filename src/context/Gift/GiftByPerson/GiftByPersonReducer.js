import { GET_ALL_GIFTS_BY_PERSON } from "./GiftByPersonTypes";

export default function giftsByPersonReducer(state, action) {

    switch (action.type) {
        
        case GET_ALL_GIFTS_BY_PERSON:

            return {
                ...state.giftsByPerson,
                giftsByPerson: action.payload,
            };
    
        default:
            return state;
    }

}