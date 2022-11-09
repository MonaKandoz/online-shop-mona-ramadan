import { CATAGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATTE = {
    categories: [],
};

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATTE, action = {}) => {
    const {type, payload} = action;
    switch (type){
        case CATAGORIES_ACTION_TYPES.SET_CATEGORIES:
            return {...state, categories: payload };
        default:
            return state;
    }
};