import {
    STORE_GET_CATEGORIES,
    STORE_GET_CATEGORIES_SUCCESS,
    STORE_GET_CATEGORIES_FAIL,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
    STORE_GET_PRODUCTS_BY_CATEGORY_ID_FAIL,
    STORE_GET_PRODUCT_BY_ID,
    STORE_GET_PRODUCT_BY_ID_SUCCESS,
    ADD_TO_BASKET,
    DELETE_FROM_BASKET,
    STORE_DELIVERY_CHANGE,
    STORE_COUNTRY_CHANGE,
    STORE_CITY_CHANGE,
    STORE_NP_CITY_CHANGE,
    STORE_CITY_SELECTED,
    STORE_SELECT_ADDRESS,
    STORE_ADDRESS_CHANGE,
    STORE_NP_SKLAD,
    STORE_COMMENT_CHANGE,
    STORE_GET_HISTORY_START,
    STORE_GET_HISTORY_SUCCESS
} from '../Actions/types';
import {
    STORE_CATEGORIES_URL,
    STORE_PRODUCTS_URL,
    STORE_PRODUCT_BY_ID_URL,
    STORE_PRODUCT_INCREASE_VIEWS_URL,
    STORE_MAKE_ORDER_URL,
    STORE_HISTORY_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'
import {encode} from 'base-64';

/*
Products, Categories
 */
export const getCategories = (token, phone) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_CATEGORIES
        })
console.log(token, phone)
        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
console.log('STORE get categories - ', signatureString, signature, STORE_CATEGORIES_URL);
        axios.get(STORE_CATEGORIES_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(categories => {
                    console.log(categories.data);
                    onGetCategoriesSuccess(dispatch, categories.data.categories)
                }
            )
            .catch((error) => {
                console.log(error)
            })
        // let categories = [
        //     {
        //         "id":163,
        //         "name":"Cars",
        //         "slug":"cars",
        //         "image":false
        //     },
        //     {
        //         "id":170,
        //         "name":"Clothing",
        //         "slug":"clothing",
        //         "image":false,
        //         "sub_categories":[
        //             {
        //                 "id":171,
        //                 "name":"Hoodies",
        //                 "slug":"hoodies",
        //                 "image":false
        //             },
        //             {
        //                 "id":175,
        //                 "name":"T-shirts",
        //                 "slug":"t-shirts",
        //                 "image":false
        //             }
        //         ]
        //     }
        // ]
        // onGetCategoriesSuccess(dispatch, categories)
    }
}

const onGetCategoriesSuccess = (dispatch, categories) => {
    dispatch ({
        type: STORE_GET_CATEGORIES_SUCCESS,
        payload: categories
    })
}

export const getProductsByCategoriesId = (token, phone, categoryId) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCTS_BY_CATEGORY_ID
        })

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
console.log('STORE get products - ', signature, STORE_PRODUCTS_URL);
        axios.get(STORE_PRODUCTS_URL, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetProductsSuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetProductsSuccess = (dispatch, products) => {
    dispatch ({
        type: STORE_GET_PRODUCTS_BY_CATEGORY_ID_SUCCESS,
        payload: products.products
    })
}

export const getProductById = (token, phone, productId) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_PRODUCT_BY_ID
        })

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        console.log('STORE get products - ', signature, STORE_PRODUCT_BY_ID_URL);
        axios.get(STORE_PRODUCT_BY_ID_URL+productId, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(product => onGetProductSuccess(dispatch, product.data))
            .catch((error) => {
                console.log(error)
            })
        /*let product = {
            "id":"60",
            "name":"Woo Logo",
            "photo":"http://wp.dev/wp-content/uploads/2013/06/hoodie_6_front.jpg",
            "price":"35",
            "bonus_price":"",
            "views": "1",
            "gallery":[
                "http://wp.dev/wp-content/uploads/2013/06/hoodie_6_back.jpg"
            ],
            "status":"instock",
            "categories":{
                "id":171,
                "name":"Hoodies"
            }
        }
        onGetProductSuccess(dispatch, product)*/
    }
}

const onGetProductSuccess = (dispatch, product) => {
console.log(product);
    dispatch ({
        type: STORE_GET_PRODUCT_BY_ID_SUCCESS,
        payload: product.product
    })
}

export const addToBasket = (productId) => {
    return {
        type: ADD_TO_BASKET ,
        payload: productId
    }
}

export const deleteFromBasket = (id) => {
    return {
        type: DELETE_FROM_BASKET,
        payload: id
    }
}

export const increseCounter = (token, phone, productId) => {
    return (dispatch) => {

        let signatureString = token+":"+phone;
        const signature = encode(signatureString);
        console.log('STORE increase product views counter - ', signature, STORE_PRODUCT_INCREASE_VIEWS_URL);
        axios.post(STORE_PRODUCT_INCREASE_VIEWS_URL+productId,{}, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then( response => {
                console.log(response)
            })
            .catch((error) => {
                console.log(error)
            })
    }
}

export const makeOrder = (user, products) => {
    return () => {
        let signatureString = user.token+":"+user.profile.phone;
        const signature = encode(signatureString);

        const obj = {
            "products":products, // Array of product's ID
            "userID": user.id, // User ID (string or integer)
            "orderType": ''// booking - will make create order without payment step, if empty will set status "Pending payment"
        };
        const data = JSON.stringify(obj);

console.log('STORE make order - ', signature, STORE_MAKE_ORDER_URL, obj, user);
        // axios.post(STORE_MAKE_ORDER_URL, data, {
        //         headers: {
        //             'Signature' : signature,
        //             'Content-Type': 'application/json',
        //         }
        //     }
        // )
        //     .then(response => console.log(response))
        //     .catch((error) => {
        //         console.log(error)
        //     })
    }
}

export const changeDelivery = (delivery) => {
    return {
        type: STORE_DELIVERY_CHANGE,
        payload: delivery
    }
}

export const changeCity = (city) => {
    return {
        type: STORE_CITY_CHANGE,
        payload: city
    }
}

export const selectCity = (city) => {
    return {
        type: STORE_CITY_SELECTED,
        payload: city
    }
}

export const changeNPCity = (city) => {
    return {
        type: STORE_NP_CITY_CHANGE,
        payload: city
    }
}

export const changeAddress = (address) => {
    return {
        type: STORE_ADDRESS_CHANGE,
        payload: address
    }
}

export const selectAddress = (address) => {
    return {
        type: STORE_SELECT_ADDRESS,
        payload: address
    }
}

export const changeNPSkald = (value) => {
    return {
        type: STORE_NP_SKLAD,
        payload: value
    }
}

export const changeComment = (text) => {

    return {
        type: STORE_COMMENT_CHANGE,
        payload: text
    }
}

export const getHistory = (user) => {
    return (dispatch) => {

        dispatch({
            type: STORE_GET_HISTORY_START
        })

        let signatureString = user.token+":"+user.phone;
        const signature = encode(signatureString);
        console.log('STORE get products - ', signature, STORE_HISTORY_URL);
        axios.get(STORE_HISTORY_URL+user.id, {
                headers: {
                    'Signature' : signature,
                }
            }
        )
            .then(products => onGetHistorySuccess(dispatch, products.data))
            .catch((error) => {
                console.log(error)
            })
    }
}

const onGetHistorySuccess = (dispatch, products) => {
    return {
        type: STORE_GET_HISTORY_SUCCESS,
        payload: products.orders
    }
}