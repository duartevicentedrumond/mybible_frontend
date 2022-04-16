import { useReducer } from "react";
import axios from "axios";

import categoryReducer from "./CategoryReducer";
import CategoryContext from "./CategoryContext";
import { GET_CATEGORIES, ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from "./CategoryTypes";

const initialState = {
    categories: []
};

export const CategoryContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(categoryReducer, initialState);

    const getCategories = async () => {
        const response = await axios.get(
            'http://localhost:8080/category/getAll');

        dispatch({
            type: GET_CATEGORIES,
            payload: response.data,
        });
    };

    const getCategory = async (id) => {
        const response = await axios.get('http://localhost:8080/category/' + id);
        console.log(response)
    };

    const addCategory = async (category) => {

        const newCategory = category;

        const response = await axios.post(
            'http://localhost:8080/category/add', newCategory);
        
        console.log(response.data);

        dispatch({
            type: ADD_CATEGORY, 
            payload: category
        });
    };

    const updateCategory = async (category) => {

        const updatedCategory = category;

        const response = await axios.put(
            'http://localhost:8080/category/update/' + updateCategory.categoryId, updateCategory);
        
        console.log(response.data);

        dispatch({
            type: UPDATE_CATEGORY, 
            payload: category
        });
    };

    const deleteCategory = (id) => {
        
        dispatch({
            type: DELETE_CATEGORY,
            payload: id,
        });

    };

    return (
        <CategoryContext.Provider value={{ ...state, getCategories, getCategory, addCategory, deleteCategory, updateCategory }}>
            {children}
        </CategoryContext.Provider>
    )
};