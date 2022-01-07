/*This reducer handles the data for flagging/removing resources
*/
import { 
    FLAG_RESOURCE,
    CLEAR_FLAG_RESOURCE,
    GET_RESOURCE_FLAG_ID
 } from '../actions/types';

const INITIAL_STATE = {
    resourceFlagModal: false,
    resourceFlagId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FLAG_RESOURCE:
            return { resourceFlagModal: true };
        case CLEAR_FLAG_RESOURCE:
            return { resourceFlagModal: false };
        case GET_RESOURCE_FLAG_ID:
            return { ...state, resourceFlagId: action.payload };
        default:
            return state;
    }
};
