import { GET_PEOPLE, ADD_PERSON, UPDATE_PERSON, DELETE_PERSON } from "./PersonTypes";

export default function personReducer(state, action) {

    switch (action.type) {
        
        case GET_PEOPLE:

            return {
                ...state.people,
                people: action.payload,
            }
        
        case ADD_PERSON:
            
            return {
                people: [
                    ...state.people, 
                    action.payload
                ],
            };

        case UPDATE_PERSON:

            const updatedPerson = action.payload;

            const updatedPeople = state.people.map(
                (person) => {

                    if(person.personId === updatedPerson.personId){
                        
                        person.nickname = updatedPerson.nickname;
                        person.fullName = updatedPerson.fullName;
                        person.birthday = updatedPerson.birthday;

                    }
                    
                    return person;

                }
            );
            
            return{
                people: updatedPeople,
            };

        case DELETE_PERSON:
            
            return{
                people: state.people.filter(
                    (person) => person.personId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}