import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../store/actions/AuthActions'
import { clearContacts } from '../../store/actions/ContactActions'

const Navbar = ({ title, icon, auth, logout, clearContacts }) => {

    const { isAuthenticated, user } = auth;

    const onlogout = () => {
        logout();
        clearContacts();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onlogout} href='#!' >
                    <i className="fa fa-sign-out" aria-hidden="true"></i>
                    <span className="hide-sm">{' '}Logout</span>
                </a>
            </li>
        </Fragment>
    );
    const guestLinks = (
        <Fragment>
            <li>
                <Link to="/register" >Register</Link>
            </li>
            <li>
                <Link to="/login" >Login</Link>
            </li>
        </Fragment>
    );
    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} />{' '}{title}
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    )
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: "Contact Keeper",
    icon: 'fas fa-id-card-alt'
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logout, clearContacts })(Navbar)
