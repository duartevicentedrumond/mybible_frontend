import { GET_FURNITURES, ADD_FURNITURE, UPDATE_FURNITURE, DELETE_FURNITURE } from "./FurnitureTypes";

export default function furnitureReducer(state, action) {

    switch (action.type) {
        
        case GET_FURNITURES:

            return {
                ...state.furnitures,
                furnitures: action.payload,
            };
        
        case ADD_FURNITURE:
            
            return {
                furnitures: [
                    ...state.furnitures, 
                    action.payload
                ],
            };

        case UPDATE_FURNITURE:

            const updatedFurniture = action.payload;

            const updatedFurnitures = state.furnitures.map(
                (furniture) => {

                    if(furniture.furnitureId === updatedFurniture.furnitureId){
                        
                        furniture.name = updatedFurniture.name;
                        furniture.active = updatedFurniture.active;
                        furniture.since = updatedFurniture.since;
                        furniture.until = updatedFurniture.until;
                        furniture.subtransactions = updatedFurniture.subtransactions;
                        furniture.building = updatedFurniture.building;
                        furniture.room = updatedFurniture.room;
                        furniture.sections = updatedFurniture.sections;
                        furniture.boxes = updatedFurniture.boxes;
                        furniture.items = updatedFurniture.items;
                    }
                    
                    return furniture;

                }
            );
            
            return{
                furnitures: updatedFurnitures,
            };

        case DELETE_FURNITURE:
            
            return{
                furnitures: state.furnitures.filter(
                    (furniture) => furniture.furnitureId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}