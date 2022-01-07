/*This reducer handles storing the updates of text/image fields as someone creates a new post
*/
import { 
    POST_UPDATE, 
    POST_RESET, 
    IMAGE_UPDATE, 
    POST_SUBMIT_FAIL,
    SHOW_PROMPT,
    CLEAR_PROMPT,
    SHOW_DELETE_PROMPT,
    CLEAR_DELETE_PROMPT,
    GET_FLAG_ID 
} from '../actions/types';

const INITIAL_STATE = {
    post: '',
    photo: '',
    error: '',
    showModal: false,
    showDeleteModal: false,
    flagId: ''
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case POST_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case POST_RESET:
            return INITIAL_STATE;
        case POST_SUBMIT_FAIL:
            return { ...state, error: 'Invalid post.' };
        case IMAGE_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case SHOW_PROMPT:
            return { showModal: true };
        case CLEAR_PROMPT:
            return { showModal: false };
        case SHOW_DELETE_PROMPT:
            return { showDeleteModal: true };
        case CLEAR_DELETE_PROMPT:
            return { showDeleteModal: false };
        case GET_FLAG_ID:
            return { ...state, flagId: action.payload };
        default:
            return state;
    }
};
