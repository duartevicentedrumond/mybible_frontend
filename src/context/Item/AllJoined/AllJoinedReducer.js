import { GET_ALL_JOINED } from "./AllJoinedTypes";

export default function allJoinedReducer(state, action) {

    switch (action.type) {
        
        case GET_ALL_JOINED:

            return {
                ...state.allJoined,
                allJoined: action.payload,
            };
    
        default:
            return state;
    }

}