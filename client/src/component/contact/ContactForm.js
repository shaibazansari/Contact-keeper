import React, { useState, useEffect } from 'react';
import { connect} from 'react-redux'
import PropTypes from 'prop-types';
import { addContact, clearCurrent, updateContact} from '../../store/actions/ContactActions'
import { setAlert } from '../../store/actions/AlertActions'

const ContactForm = ({current, addContact, clearCurrent, updateContact, setAlert}) => {

    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    useEffect(() => {
        if (current !== null) {
            setContact(current);
        }
        else {
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            });
        }
    }, [current])

    const { name, email, phone, type } = contact;

    const onchange = e => setContact({ ...contact, [e.target.name]: e.target.value });
    const onsubmit = e => {
        e.preventDefault();
        if ( name === '' || email === '' || phone === ''){
            setAlert('All fields are required','danger')
        }
        else if (current !== null) {
            updateContact(contact);
        } else {
            addContact(contact);
            setContact({
                name: '',
                email: '',
                phone: '',
                type: 'personal'
            }); 
        }
        clearAll();
    }

    const clearAll = () => {
        clearCurrent();
    }
    return (
        <form onSubmit={onsubmit}>
            <h3>{current === null ? 'Add Contact' : 'Edit Contact'}</h3>
            <input type="text" placeholder="Name" name="name" value={name} onChange={onchange} />
            <input type="email" placeholder="Email" name="email" value={email} onChange={onchange} />
            <input type="text" placeholder="Phone" name="phone" value={phone} onChange={onchange} />
            <h5>Contact Type</h5>
            <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange={onchange} /> Personal{('  ')}
            <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange={onchange} /> Professional
            <div>
                <input type='submit' value={current === null ? 'Add Contact' : 'Update Contact'} className='btn btn-primary btn-block' />
            </div>
            {current && <div>
                <button className="btn btn-light btn-block" onClick={clearAll}>Clear</button>
            </div>}
        </form>
    )
}

ContactForm.propTypes = {
    current : PropTypes.object
}
 
const mapStateToProps = state => ({
    current : state.contact.current
})

export default connect(mapStateToProps,{ addContact, clearCurrent, updateContact, setAlert})(ContactForm);
