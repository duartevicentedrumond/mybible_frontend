import { GET_GIFTS, ADD_GIFT, UPDATE_GIFT, DELETE_GIFT } from "./GiftTypes";

export default function giftReducer(state, action) {

    switch (action.type) {
        
        case GET_GIFTS:

            return {
                ...state.gifts,
                gifts: action.payload,
            }
        
        case ADD_GIFT:
            
            return {
                gifts: [
                    ...state.gifts, 
                    action.payload
                ],
            };

        case UPDATE_GIFT:

            const updatedGift = action.payload;

            const updatedGifts = state.gifts.map(
                (gift) => {

                    if(gift.giftId === updatedGift.giftId){
                        
                        gift.value = updatedGift.value;
                        gift.description = updatedGift.description;
                        gift.date = updatedGift.date;
                        gift.from = updatedGift.from;
                        gift.date = updatedGift.date;
                        gift.gifttypeId = updatedGift.gifttypeId;
                        gift.transaction = updatedGift.transaction;
                        gift.people = updatedGift.people;
                        gift.building = updatedGift.building;
                        gift.room = updatedGift.room;
                        gift.furniture = updatedGift.furniture;
                        gift.section = updatedGift.section;
                        gift.box = updatedGift.box;
                        gift.item = updatedGift.item;

                    }
                    
                    return gift;

                }
            );
            
            return{
                gift: updatedGifts,
            };

        case DELETE_GIFT:
            
            return{
                gifts: state.gifts.filter(
                    (gift) => gift.giftId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}