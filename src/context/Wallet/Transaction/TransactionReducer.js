import { GET_TRANSACTIONS, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

export default function transactionReducer(state, action) {

    switch (action.type) {
        
        case GET_TRANSACTIONS:

            return {
                ...state.transactions,
                transactions: action.payload,
            };
        
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

                    if(transaction.transactionId === updatedTransaction.transactionId){
                        
                        transaction.description = updatedTransaction.description;
                        transaction.date = updatedTransaction.date;
                        transaction.types = updatedTransaction.types;
                        transaction.subtransactions = updatedTransaction.subtransactions;
                        transaction.transactionParent = updatedTransaction.transactionParent;

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
                    (transaction) => transaction.transactionId !== action.payload
                ),
            };
    
        default:
            return state;
    }

}