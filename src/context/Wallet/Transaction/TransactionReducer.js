import { GET_TRANSACTIONS, GET_SUBTRANSACTION_BY_TRANSACTION, GET_CATEGORIES_SUM, GET_DEBTS_SUM, ADD_TRANSACTION, UPDATE_TRANSACTION, DELETE_TRANSACTION } from "./TransactionTypes";

export default function transactionReducer(state, action) {

    switch (action.type) {
        
        case GET_TRANSACTIONS:

            return {
                ...state,
                transactions: action.payload,
            };
        
        case ADD_TRANSACTION:
            
            return {
                ...state,
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
                ...state,
                transactions: updatedTransactions,
            };

        case DELETE_TRANSACTION:
            
            return{
                ...state,
                transactions: state.transactions.filter(
                    (transaction) => transaction.transactionId !== action.payload
                ),
            };

        case GET_SUBTRANSACTION_BY_TRANSACTION:

            return {
                ...state,
                subtransactionsByTransaction: action.payload,
            };

        case GET_CATEGORIES_SUM:

            return {
                ...state,
                categoriesSum: action.payload,
            };

        case GET_DEBTS_SUM:

            return {
                ...state,
                debtsSum: action.payload,
            };
    
        default:
            return state;
    }

}