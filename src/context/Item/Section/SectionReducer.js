import { GET_SECTIONS, ADD_SECTION, UPDATE_SECTION, DELETE_SECTION } from "./SectionTypes";

export default function sectionReducer(state, action) {

    switch (action.type) {
        
        case GET_SECTIONS:

            return {
                ...state.sections,
                sections: action.payload,
            };
        
        case ADD_SECTION:
            
            return {
                sections: [
                    ...state.sections, 
                    action.payload
                ],
            };

        case UPDATE_SECTION:

            const updatedSection = action.payload;

            const updatedSections = state.sections.map(
                (section) => {

                    if(section.sectionId === updatedSection.sectionId){
                        
                        section.name = updatedSection.name;
                        section.active = updatedSection.active;
                        section.since = updatedSection.since;
                        section.until = updatedSection.until;
                        section.subtransactions = updatedSection.subtransactions;
                        section.building = updatedSection.building;
                        section.room = updatedSection.room;
                        section.furniture = updatedSection.furniture;
                        section.boxes = updatedSection.boxes;
                        section.items = updatedSection.items;
                    }
                    
                    return section;

                }
            );
            
            return{
                sections: updatedSections,
            };

        case DELETE_SECTION:
            
            return{
                sections: state.sections.filter(
                    (section) => section.sectionId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}