import {
    STORE_GET_CATEGORIES,
    STORE_GET_CATEGORIES_SUCCESS,
    STORE_GET_CATEGORIES_FAIL,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL,
    STORE_GET_PRODUCTS_BY_ID,
    STORE_GET_PRODUCT_BY_ID_SUCCESS,
    STORE_GET_PRODUCT_BY_ID_FAIL,
    ADD_TO_BASKET,
    DELETE_FROM_BASKET
} from '../Actions/types';
const INITIAL_STATE = {
    categories: [],
    products: [],
    product: null,
    error: null,
    loading: false,
    basket: []
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case STORE_GET_CATEGORIES:
            return {...state, loading: true};
        case STORE_GET_CATEGORIES_SUCCESS:
            return {...state, loading: false, categories: action.payload};
        case STORE_GET_CATEGORIES_FAIL:
            return {...state, loading: false, categories: [], error: action.payload};

        case STORE_GET_PRODUCTS_BY_CATEGORY_ID:
            return {...state, loading: true};
        case STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS:
            return {...state, loading: false, products: action.payload};
        case STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL:
            return {...state, loading: false, products: [], error: action.payload};
        case STORE_GET_PRODUCT_BY_ID_SUCCESS:
            return {...state, loading: false, product: action.payload};
        case STORE_GET_PRODUCT_BY_ID_FAIL:
            return {...state, loading: false, products: [], error: action.payload};
        case ADD_TO_BASKET:
            let newBasket = state.basket.slice();
            newBasket[action.payload.id] = action.payload;
console.log(newBasket);
            return {...state, loading: false, products: [], basket: newBasket};
        case DELETE_FROM_BASKET:
            let copyBasket = state.basket;
            var index = copyBasket.indexOf(action.payload);
            if (index > -1) {
                copyBasket.splice(index, 1);
            }
console.log(newBasket);
            return {...state, loading: false, basket: newBasket};
        default: return state;
    }
}