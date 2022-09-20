import { GET_BUILDINGS, ADD_BUILDING, UPDATE_BUILDING, DELETE_BUILDING } from "./BuildingTypes";

export default function buildingReducer(state, action) {

    switch (action.type) {
        
        case GET_BUILDINGS:

            return {
                ...state.buildings,
                buildings: action.payload,
            };
        
        case ADD_BUILDING:
            
            return {
                buildings: [
                    ...state.buildings, 
                    action.payload
                ],
            };

        case UPDATE_BUILDING:

            const updatedBuilding = action.payload;

            const updatedBuildings = state.buildings.map(
                (building) => {

                    if(building.buildingId === updatedBuilding.buildingId){
                        
                        building.name = updatedBuilding.name;
                        building.active = updatedBuilding.active;
                        building.since = updatedBuilding.since;
                        building.until = updatedBuilding.until;
                        building.subtransactions = updatedBuilding.subtransactions;
                        building.rooms = updatedBuilding.rooms;
                        building.furnitures = updatedBuilding.furnitures;
                        building.sections = updatedBuilding.sections;
                        building.boxes = updatedBuilding.boxes;
                        building.items = updatedBuilding.items;
                    }
                    
                    return building;

                }
            );
            
            return{
                buildings: updatedBuildings,
            };

        case DELETE_BUILDING:
            
            return{
                buildings: state.buildings.filter(
                    (building) => building.buildingId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}