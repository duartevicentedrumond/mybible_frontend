import { useReducer } from "react";
import axios from "axios";

import categorySumReducer from "./CategorySumReducer";
import CategorySumContext from "./CategorySumContext";
import { GET_ALL } from "./CategorySumTypes";

const initialState = {
    categoriesSum: []
};

export const CategorySumContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categorySumReducer, initialState);

    const getCategoriesSum = async () => {
        const response = await axios.get(
            'http://localhost:8080/transaction/getSumByCategory');

        dispatch({
            type: GET_ALL,
            payload: response.data,
        });
    };

    return (
        <CategorySumContext.Provider value={{ ...state, getCategoriesSum }}>
            {children}
        </CategorySumContext.Provider>
    )
};