import { createAction } from "../../utils/reducer/reducer.utils";
import { CATAGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categories) => createAction( CATAGORIES_ACTION_TYPES.SET_CATEGORIES, categories);