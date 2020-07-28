import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from './types';

// Load user
export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}

// Register User
export const register = formdata => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/users', formdata, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

        loadUser();
    } catch (err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        })
    }
}
// Login User
export const login = formdata =>  async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    try {
        const res = await axios.post('/api/auth', formdata, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        await loadUser();
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        })
    }
}

// Logout
export const logout = () => ({ type: LOGOUT});

// Clear Errors
export const clearErrors = () => ({ type: CLEAR_ERRORS});
