import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { connect} from 'react-redux'
import PropTypes from 'prop-types';
import { getContacts } from '../../store/actions/ContactActions'
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contact = ({ contact, getContacts }) => {

    const { contacts, filtered, loading } = contact;

    useEffect(() => {
        setTimeout(() => {
            getContacts(); 
        }, 2000);
        //     eslint-disable-next-line
    }, [])
    
    if (contacts!== null && contacts.length === 0 && !loading) {
        return <h4>Please add a Contact</h4>
    }
    return (
        <Fragment>
            {contacts !== null && !loading ? (<TransitionGroup>
                {filtered !== null ? filtered.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                )) : contacts.map(contact => (
                    <CSSTransition key={contact._id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>
                ))}
            </TransitionGroup>) : <Spinner />}
        </Fragment>
    )
}

Contact.propTypes = {
    contacts : PropTypes.object,
    filtered : PropTypes.object
}
 
const mapStateToProps = state => ({
    contact : state.contact
})

export default connect(mapStateToProps,{ getContacts})(Contact);
