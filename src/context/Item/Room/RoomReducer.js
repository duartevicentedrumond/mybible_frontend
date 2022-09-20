import { GET_ROOMS, ADD_ROOM, UPDATE_ROOM, DELETE_ROOM } from "./RoomTypes";

export default function roomReducer(state, action) {

    switch (action.type) {
        
        case GET_ROOMS:

            return {
                ...state.rooms,
                rooms: action.payload,
            };
        
        case ADD_ROOM:
            
            return {
                rooms: [
                    ...state.rooms, 
                    action.payload
                ],
            };

        case UPDATE_ROOM:

            const updatedRoom = action.payload;

            const updatedRooms = state.rooms.map(
                (room) => {

                    if(room.roomId === updatedRoom.roomId){
                        
                        room.name = updatedRoom.name;
                        room.active = updatedRoom.active;
                        room.since = updatedRoom.since;
                        room.until = updatedRoom.until;
                        room.subtransactions = updatedRoom.subtransactions;
                        room.building = updatedRoom.building;
                        room.furnitures = updatedRoom.furnitures;
                        room.sections = updatedRoom.sections;
                        room.boxes = updatedRoom.boxes;
                        room.items = updatedRoom.items;
                    }
                    
                    return room;

                }
            );
            
            return{
                rooms: updatedRooms,
            };

        case DELETE_ROOM:
            
            return{
                rooms: state.rooms.filter(
                    (room) => room.roomId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}