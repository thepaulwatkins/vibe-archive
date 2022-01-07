/*This reducer handles the data from actions within resource threads...focusing on comment creation
*/
import {
    RESOURCE_COMMENT_UPDATE,
    RESOURCE_COMMENT_IMAGE_UPDATE,
    RESOURCE_COMMENT_RESET,
    RESOURCE_COMMENT_SUBMIT_FAIL,
    SHOW_RESOURCE_COMMENT_PROMPT,
    CLEAR_RESOURCE_COMMENT_PROMPT,
    GET_RESOURCE_COMMENT_ID
} from '../actions/types';

const INITIAL_STATE = {
    resourceComment: '',
    resourceCommentPhoto: '',
    showResourceCommentModal: false,
    resourceCommentId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESOURCE_COMMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESOURCE_COMMENT_RESET:
            return INITIAL_STATE;
        case RESOURCE_COMMENT_IMAGE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case RESOURCE_COMMENT_SUBMIT_FAIL:
            return { ...state, error: 'Invalid comment.' };
        case SHOW_RESOURCE_COMMENT_PROMPT:
            return { showResourceCommentModal: true };
        case CLEAR_RESOURCE_COMMENT_PROMPT:
            return { showResourceCommentModal: false };
        case GET_RESOURCE_COMMENT_ID:
            return { ...state, resourceCommentId: action.payload };
        default:
            return state;
    }
};