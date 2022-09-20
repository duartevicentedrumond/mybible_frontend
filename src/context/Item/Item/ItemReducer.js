import { GET_ITEMS, ADD_ITEM, UPDATE_ITEM, DELETE_ITEM } from "./ItemTypes";

export default function itemReducer(state, action) {

    switch (action.type) {
        
        case GET_ITEMS:

            return {
                ...state.items,
                items: action.payload,
            };
        
        case ADD_ITEM:
            
            return {
                items: [
                    ...state.items, 
                    action.payload
                ],
            };

        case UPDATE_ITEM:

            const updatedItem = action.payload;

            const updatedItems = state.items.map(
                (item) => {

                    if(item.itemId === updatedItem.itemId){
                        
                        item.name = updatedItem.name;
                        item.active = updatedItem.active;
                        item.since = updatedItem.since;
                        item.until = updatedItem.until;
                        item.subtransactions = updatedItem.subtransactions;
                        item.building = updatedItem.building;
                        item.room = updatedItem.room;
                        item.furniture = updatedItem.furniture;
                        item.section = updatedItem.section;
                        item.box = updatedItem.box;
                    }
                    
                    return item;

                }
            );
            
            return{
                items: updatedItems,
            };

        case DELETE_ITEM:
            
            return{
                items: state.items.filter(
                    (item) => item.itemId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}