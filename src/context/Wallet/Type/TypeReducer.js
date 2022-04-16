import { GET_TYPES, ADD_TYPE, UPDATE_TYPE, DELETE_TYPE } from "./TypeTypes";

export default function typeReducer(state, action) {

    switch (action.type) {
        
        case GET_TYPES:

            return {
                ...state.types,
                types: action.payload,
            }
        
        case ADD_TYPE:
            
            return {
                types: [
                    ...state.types, 
                    action.payload
                ],
            };

        case UPDATE_TYPE:

            const updatedType = action.payload;

            const updatedTypes = state.types.map(
                (type) => {

                    if(type.typeId === updatedType.typeId){
                        
                        type.description = updatedType.description;

                    }
                    
                    return type;

                }
            );
            
            return{
                types: updatedTypes,
            };

        case DELETE_TYPE:
            
            return{
                types: state.types.filter(
                    (type) => type.typeId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}