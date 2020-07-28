import React, { useState, useEffect} from 'react';
import { connect} from 'react-redux'
import PropTypes from 'prop-types';
import { register, clearErrors } from '../../store/actions/AuthActions'
import { setAlert } from '../../store/actions/AlertActions'

const Register = (props) => {

    const {register, clearErrors, setAlert} = props
    const { error, isAuthenticated } = props.auth;

    useEffect(() => {
        if (isAuthenticated) {
            props.history.push('/');
        }
        if (error === 'user already exists') {
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name  : '',
        email : '',
        password : '',
        password2 : ''
    });

    const { name, email, password, password2 } = user;

    const onchange = e => setUser({ ...user, [e.target.name] : e.target.value});

    const onsubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '' || password2 === '') {
            setAlert('Please enter all fields', 'danger')
        } else if( password !== password2) {
            setAlert('Password do not match', 'danger');
        }else{
            register({
                name,
                email,
                password
            });
        }
    }

    return (
        <div className='form-container'>
            <h1>
                Account <span className='text-primary'>Register</span>
            </h1>
            <form onSubmit={onsubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input type='text' name='name' value={name} onChange={onchange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' value={email} onChange={onchange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' value={password} onChange={onchange} />
                </div>
                <div className='form-group'>
                    <label htmlFor='password2'>Confirm Password</label>
                    <input type='password' name='password2' value={password2} onChange={onchange} />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

Register.propTypes = {
    auth : PropTypes.object
}
 
const mapStateToProps = state => ({
    auth : state.auth
})

export default connect(mapStateToProps,{ register, clearErrors, setAlert})(Register)
