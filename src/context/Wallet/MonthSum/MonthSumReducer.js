import { GET_ALL } from "./MonthSumTypes";

export default function monthSumReducer(state, action) {

    switch (action.type) {
        
        case GET_ALL:

            return {
                ...state.monthsSum,
                monthsSum: action.payload,
            }
        
        default:
            return state;
    }

}