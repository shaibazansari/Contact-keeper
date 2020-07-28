import React,{ useRef, useEffect} from 'react';
import { connect} from 'react-redux'
import PropTypes from 'prop-types';
import { filterContacts, clearFilter } from '../../store/actions/ContactActions'

const ContactFilter = ({filtered, filterContacts, clearFilter}) => {

    const text = useRef('');

    useEffect(() => {
        if (filtered === null) {
            text.current.value = '';
        }
        // eslint-disable-next-line
    }, [])

    const onchange = e => {
        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }
    return (
        <form>
            <input ref={text} type='text' placeholder='Filter contacts...' onChange={onchange}/>
        </form>
    )
}

ContactFilter.propTypes = {
    filtered : PropTypes.array
}
 
const mapStateToProps = state => ({
    filtered : state.contact.filtered
})

export default connect(mapStateToProps,{ filterContacts, clearFilter})(ContactFilter)
