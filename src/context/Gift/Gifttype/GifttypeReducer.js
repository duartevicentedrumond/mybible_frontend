import { GET_GIFTTYPES, ADD_GIFTTYPE, UPDATE_GIFTTYPE, DELETE_GIFTTYPE } from "./GifttypeTypes";

export default function gifttypeReducer(state, action) {

    switch (action.type) {
        
        case GET_GIFTTYPES:

            return {
                ...state.gifttypes,
                gifttypes: action.payload,
            }
        
        case ADD_GIFTTYPE:
            
            return {
                gifttypes: [
                    ...state.gifttypes, 
                    action.payload
                ],
            };

        case UPDATE_GIFTTYPE:

            const updatedGifttype = action.payload;

            const updatedGifttypes = state.gifttypes.map(
                (gifttype) => {

                    if(gifttype.gifttypeId === updatedGifttype.gifttypeId){
                        
                        gifttype.description = updatedGifttype.description;

                    }
                    
                    return gifttype;

                }
            );
            
            return{
                gifttype: updatedGifttypes,
            };

        case DELETE_GIFTTYPE:
            
            return{
                gifttypes: state.gifttypes.filter(
                    (gifttype) => gifttype.gifttypeId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}