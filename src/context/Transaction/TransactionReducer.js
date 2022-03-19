import { ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

export default function transactionReducer(state, action) {

    switch (action.type) {
        case ADD_TRANSACTION:
            
            return {
                transactions: [
                    ...state.transactions, 
                    action.payload
                ],
            };

        case UPDATE_TRANSACTION:

            const updatedTransaction = action.payload;

            const updatedTransactions = state.transactions.map(
                (transaction) => {

                    if(transaction.id == updatedTransaction.id){
                        
                        transaction.description = updatedTransaction.description;
                        transaction.date = updatedTransaction.date;
                        transaction.amount = updatedTransaction.amount;
                        transaction.category = updatedTransaction.category;
                        transaction.type = updatedTransaction.type;

                    }
                    
                    return transaction;

                }
            );
            
            return{
                transactions: updatedTransactions,
            };

        case DELETE_TRANSACTION:
            
            return{
                transactions: state.transactions.filter(
                    (transaction) => transaction.id !== action.payload
                ),
            };
    
        default:
            return state;
    }

}