import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "./CategoryTypes";

export default function categoryReducer(state, action) {

    switch (action.type) {
        
        case GET_CATEGORIES:

            return {
                ...state.categories,
                categories: action.payload,
            }
        
        case ADD_CATEGORY:
            
            return {
                categories: [
                    ...state.categories, 
                    action.payload
                ],
            };

        case UPDATE_CATEGORY:

            const updatedCategory = action.payload;

            const updatedCategories = state.categories.map(
                (category) => {

                    if(category.categoryId === updatedCategory.categoryId){
                        
                        category.description = updatedCategory.description;

                    }
                    
                    return category;

                }
            );
            
            return{
                categories: updatedCategories,
            };

        case DELETE_CATEGORY:
            
            return{
                categories: state.categories.filter(
                    (category) => category.categoryId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}