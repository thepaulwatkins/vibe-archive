/*This reducer handles the data from when a resource is added or in the process of being added
*/
import { 
    SHOW_RESOURCE_PROMPT, 
    CLEAR_RESOURCE_PROMPT,
    RESOURCE_TYPE_UPDATE,
    RESOURCE_NAME_UPDATE,
    RESOURCE_DESCRIPTION_UPDATE,
    RESOURCE_RESET
 } from '../actions/types';

const INITIAL_STATE = {
    showResourceModal: false,
    resourceType: '',
    resourceName: '',
    resourceDescription: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SHOW_RESOURCE_PROMPT:
            return { showResourceModal: true };
        case CLEAR_RESOURCE_PROMPT:
            return INITIAL_STATE;
        case RESOURCE_TYPE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESOURCE_NAME_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESOURCE_DESCRIPTION_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESOURCE_RESET:
            return INITIAL_STATE;
        default:
            return state;
    }
};
