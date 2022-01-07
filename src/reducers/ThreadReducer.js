/*This reducer handles the data from actions within threads...focusing on comment creation
*/
import {
    COMMENT_UPDATE,
    COMMENT_IMAGE_UPDATE,
    COMMENT_RESET,
    COMMENT_SUBMIT_FAIL,
    SHOW_COMMENT_PROMPT,
    SHOW_COMMENT_DELETE_PROMPT,
    CLEAR_COMMENT_PROMPT,
    GET_COMMENT_ID
} from '../actions/types';

const INITIAL_STATE = {
    comment: '',
    commentPhoto: '',
    showCommentModal: false,
    showCommentDeleteModal: false,
    commentId: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMMENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case COMMENT_RESET:
            return INITIAL_STATE;
        case COMMENT_IMAGE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case COMMENT_SUBMIT_FAIL:
            return { ...state, error: 'Invalid comment.' };
        case SHOW_COMMENT_PROMPT:
            return { showCommentModal: true };
        case SHOW_COMMENT_DELETE_PROMPT:
            return { showCommentDeleteModal: true };
        case CLEAR_COMMENT_PROMPT:
            return { showCommentModal: false };
        case GET_COMMENT_ID:
            return { ...state, commentId: action.payload };
        default:
            return state;
    }
};
