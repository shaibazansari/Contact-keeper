// import { uuid } from 'uuid';
import {
    SET_ALERT,
    REMOVE_ALERT
} from './types';

let id = 4;

// Set Alert
export const setAlert = (msg, type, timeout=5000) => async dispatch => {
    id++;
    dispatch({
        type : SET_ALERT,
        payload : { msg, type, id}
    });

    setTimeout(() => {
        dispatch({
            type : REMOVE_ALERT,
            payload : id
        }); 
    }, timeout);
}