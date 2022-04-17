import { GET_ALL } from "./CategorySumTypes";

export default function categorySumReducer(state, action) {

    switch (action.type) {
        
        case GET_ALL:

            return {
                ...state.categoriesSum,
                categoriesSum: action.payload,
            }
        
        default:
            return state;
    }

}