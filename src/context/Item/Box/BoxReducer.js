import { GET_BOXES, ADD_BOX, UPDATE_BOX, DELETE_BOX } from "./BoxTypes";

export default function boxReducer(state, action) {

    switch (action.type) {
        
        case GET_BOXES:

            return {
                ...state.boxes,
                boxes: action.payload,
            };
        
        case ADD_BOX:
            
            return {
                boxes: [
                    ...state.boxes, 
                    action.payload
                ],
            };

        case UPDATE_BOX:

            const updatedBox = action.payload;

            const updatedBoxes = state.boxes.map(
                (box) => {

                    if(box.boxId === updatedBox.boxId){
                        
                        box.name = updatedBox.name;
                        box.active = updatedBox.active;
                        box.since = updatedBox.since;
                        box.until = updatedBox.until;
                        box.subtransactions = updatedBox.subtransactions;
                        box.building = updatedBox.building;
                        box.room = updatedBox.room;
                        box.furniture = updatedBox.furniture;
                        box.section = updatedBox.section;
                        box.items = updatedBox.items;
                    }
                    
                    return box;

                }
            );
            
            return{
                boxes: updatedBoxes,
            };

        case DELETE_BOX:
            
            return{
                boxes: state.boxes.filter(
                    (box) => box.boxId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}