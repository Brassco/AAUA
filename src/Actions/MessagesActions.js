import {
    MESSAGES_LOADED_SUCCESS,
    MESSAGES_LOAD,
    MESSAGE_LOAD,
    MESSAGES_LOAD_FAIL,
    MESSAGE_INFO_LOADED_SUCCESS,
    MESSAGE_INFO_LOADING_FAIL,
    MESSAGE_COUNTER_SUCCESS
} from '../Actions/types';
import {
    SECRET_KEY,
    DEVICE_OS,
    MESSAGES_LOADING_URL,
    MESSAGE_LOADING_URL
} from './constants';
import axios from 'axios';
import md5 from 'js-md5'

let MSG_LIMIT = 100;

export const loadMessages = (token, offset = 0) => {
    return (dispatch) => {

        dispatch({
            type: MESSAGES_LOAD
        })
        const obj = {
            "token": token,
            "limit" : MSG_LIMIT,
            "offset" : offset
        }

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)

console.log(MESSAGES_LOADING_URL, data, obj, signature);

        axios.post(MESSAGES_LOADING_URL, data, {
                headers: {
                    'Signature': signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(messages => {
console.log('messages loaded success', messages);
                let messagesAraay = [];
                for (var message in messages.data.data) {
                    messagesAraay.push({
                        id : message,
                        title : messages.data.data[message]
                    })
                }

                onMessagesLoaded(dispatch, messagesAraay, offset)
            })
            .catch( error => {
                console.log(error)
            })
    }
}

const onMessagesLoaded = (dispatch, messages, offset) => {
console.log(messages)
    dispatch({
        type: MESSAGES_LOADED_SUCCESS,
        payload: messages,
        offset: offset
    })
}

/* GET MESSAGE TEXT*/
export const getMessage = (token, messageId) => {
    return (dispatch) => {

        dispatch({
            type: MESSAGE_LOAD
        })
        const obj = {
            "token": token,
            "message_id" : messageId
        }

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)

console.log(MESSAGE_LOADING_URL, data, obj, signature);

        axios.post(MESSAGE_LOADING_URL, data, {
                headers: {
                    'Signature': signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(message => {
console.log('message info loaded success', message);

                onMessageInfoLoaded(dispatch, message.data)
            })
            .catch( error => {
                console.log(error)
            })
    }
}

const onMessageInfoLoaded = (dispatch, message) => {
    if (message.error == 0) {
        dispatch({
            type: MESSAGE_INFO_LOADED_SUCCESS,
            payload: message.data
        })
    } else {
        var errorText = 'Сбой при загрузке сообщения';
        if (message.error == 4) {
            errorText = 'Сообщение не найдено'
        }
        dispatch({
            type: MESSAGE_INFO_LOADING_FAIL,
            payload: errorText
        })
    }
}

export const countMessages = (token, offset = 0) => {
    return (dispatch) => {

        const obj = {
            "token": token,
            "limit" : MSG_LIMIT,
            "offset" : offset,
            "only_not_views" : 1
        }

        const data = JSON.stringify(obj);
        const signature = md5(SECRET_KEY + data)

        console.log(MESSAGES_LOADING_URL, data, obj, signature);

        axios.post(MESSAGES_LOADING_URL, data, {
                headers: {
                    'Signature': signature,
                    'Content-Type': 'application/json',
                }
            }
        )
            .then(messages => {
                console.log('messages count success', messages);

                onMessageCountLoaded(dispatch, messages.data)
            })
            .catch( error => {
                console.log(error)
            })
    }
}

const onMessageCountLoaded = (dispatch, messages) => {
    console.log('messages count success', messages)
    var counter = 0;
    if (messages.error == 0 && messages.data) {
        counter = messages.data.length
    }
    dispatch({
        type: MESSAGE_COUNTER_SUCCESS,
        payload: counter
    })
}
