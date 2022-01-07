/*This reducer handles retrieving all the stored posts for each respective community
*/
import { FETCH_POSTS } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return action.payload;
        default:
            return state;
    }
};
