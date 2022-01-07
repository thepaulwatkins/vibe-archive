/*This reducer handles everything to do with commenting in threads
*/
import {
    FETCH_COMMENTS
} from '../actions/types';

const INITAL_STATE = {};

export default (state = INITAL_STATE, action) => {
    switch (action.type) {
        case FETCH_COMMENTS:
            return action.payload;
        default:
            return state;
    }
};
