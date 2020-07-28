import axios from 'axios';
import {
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT,
    UPDATE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    FILTER_CONTACTS,
    CLEAR_CONTACTS,
    CLEAR_FILTER,
    CONTACT_ERROR
} from './types';

// Get Contacts
export const getContacts = () => async dispatch => {
    try {
        const res = await axios.get('/api/contacts');
        dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
};


// Add Contact
export const addContact = contact => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.post('/api/contacts',contact, config);
        dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
};

// Update Contact
export const updateContact = contact => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    try {
        const res = await axios.put(`/api/contacts/${contact._id}`,contact, config);
        dispatch({ type: UPDATE_CONTACT, payload: res.data});
    } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
};

// Delete  Contact
export const deleteContact = id => async dispatch => {
    try {
        await axios.delete(`/api/contacts/${id}`);
        dispatch({ type: DELETE_CONTACT, payload: id });    
    } catch (err) {
        dispatch({ type: CONTACT_ERROR, payload: err.response.msg });
    }
};

// Clear Contacts
export const clearContacts = () => ({ type: CLEAR_CONTACTS });


// Set Current Contact
export const setCurrent = text => dispatch => {
    dispatch({ type: SET_CURRENT, payload: text });
};

// Clear Current Contact
export const clearCurrent = () => ({ type: CLEAR_CURRENT })

// Set Filter Contact
export const filterContacts = contact => async dispatch => {
    dispatch({ type: FILTER_CONTACTS, payload: contact });
};

// Clear Filter
export const clearFilter = () => ({ type: CLEAR_FILTER })


    