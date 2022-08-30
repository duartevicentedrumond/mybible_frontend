import { GET_ALL } from "./DebtSumTypes";

export default function debtSumReducer(state, action) {

    switch (action.type) {
        
        case GET_ALL:

            return {
                ...state.debtsSum,
                debtsSum: action.payload,
            }
        
        default:
            return state;
    }

}