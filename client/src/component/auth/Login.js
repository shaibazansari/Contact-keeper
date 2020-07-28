import React, { useState, useEffect} from 'react';
import { connect} from 'react-redux'
import PropTypes from 'prop-types';
import { login, clearErrors } from '../../store/actions/AuthActions'
import { setAlert } from '../../store/actions/AlertActions'

const Login = (props) => {
    const {login , clearErrors, setAlert} = props
    const { error, isAuthenticated } = props.auth;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'invalid credentials') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    const onchange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onsubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            setAlert('Please enter all fields', 'danger')
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Login</span>
            </h1>
            <form onSubmit={onsubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onchange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onchange} />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

Login.propTypes = {
    auth : PropTypes.object
}
 
const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{ login, clearErrors, setAlert})(Login)
