import React,{ useEffect} from 'react';
import Contact from '../contact/Contact';
import ContactForm from '../contact/ContactForm';
import ContactFilter from '../contact/ContactFilter';
import { connect} from 'react-redux'
import { loadUser } from '../../store/actions/AuthActions'

const Home = ({loadUser}) => {

    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, [])
    return (
        <div className="grid-2 my-1">
            <div>
                <ContactForm />
            </div>
            <div>
                <ContactFilter />
                <Contact />
            </div>
        </div>
    )
}

export default connect(null, { loadUser})(Home);
