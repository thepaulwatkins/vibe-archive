/*This reducer fetches the appropriate list of resources from firebase*/
import { FETCH_RESOURCES } from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_RESOURCES:
            return action.payload;
        default:
            return state;
    }
};
