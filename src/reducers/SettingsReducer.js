/*This reducer is responsible for handling all of the data within the
*settings page
*/
import { LOGOUT_USER, LOGOUT_USER_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGOUT_USER:
            return { ...state, loading: true };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, user: action.payload };
        default:
            return state;
    }
};
