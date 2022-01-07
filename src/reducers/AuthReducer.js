/*This reducer handles everything to do with authentication
*/
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    NAME_CHANGED,
    LOGIN_USER_SUCCESS,
    SIGNUP_USER_SUCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from '../actions/types';

/*Create initial state for the reducer
*/
const INITIAL_STATE = { 
    email: '',
    password: '',
    name: '',
    user: '',
    error: '',
    loading: false
 };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED:
            return { ...state, email: action.payload };
        case PASSWORD_CHANGED:
            return { ...state, password: action.payload };
        case NAME_CHANGED:
            return { ...state, name: action.payload };
        case LOGIN_USER:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case SIGNUP_USER_SUCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        case LOGIN_USER_FAIL:
            return { ...state, error: 'Incorrect login. Please try again.', loading: false };
        case SIGNUP_USER_FAIL:
            return { ...state, error: 'Please make sure...', loading: false };
        default:
            return state;
    }
};
