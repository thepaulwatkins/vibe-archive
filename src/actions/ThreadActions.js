/*This file contains all the actions relating to threads
*/
import firebase from 'firebase';
import {
    COMMENT_UPDATE,
    COMMENT_IMAGE_UPDATE,
    COMMENT_RESET,
    COMMENT_SUBMIT_FAIL,
    FETCH_COMMENTS,
    SHOW_COMMENT_PROMPT,
    SHOW_COMMENT_DELETE_PROMPT,
    CLEAR_COMMENT_PROMPT,
    GET_COMMENT_ID
} from './types';

/*Keeps track of the change in state as a user creates a comment
*/
export const commentUpdate = ({ prop, value }) => {
    return {
        type: COMMENT_UPDATE,
        payload: { prop, value }
    };
};

export const commentImageUpdate = ({ prop, value }) => {
    return {
        type: COMMENT_IMAGE_UPDATE,
        payload: { prop, value }
    };
};

/*When the user submits the comment, add it to the firebase database
*/
export const submitComment = ({ comment, commentPhoto, name, commentUserId, isOriginalPoster, uid, community, school }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/posts/${community}/${uid}/comments`)
            .push({ comment, commentPhoto, name, commentUserId, isOriginalPoster })
            .then(() => {
                dispatch({ type: COMMENT_RESET });
            })
            .catch(() => commentSubmitFail(dispatch));
    };
};

/*Fetch the list of comments for each respective post!
*/
export const getComments = ({ uid, community, school }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/posts/${community}/${uid}/comments`)
            .on('value', snapshot => {
                dispatch({ type: FETCH_COMMENTS, payload: snapshot.val() });
            });
    };
};

export const showCommentPrompt = () => {
    return {
        type: SHOW_COMMENT_PROMPT
    };
};

export const showCommentDeletePrompt = () => {
    return {
        type: SHOW_COMMENT_DELETE_PROMPT
    };
};

export const declineCommentPrompt = () => {
    return {
        type: CLEAR_COMMENT_PROMPT
    };
};

export const getFlagCommentId = (commentId) => {
    return {
        type: GET_COMMENT_ID,
        payload: commentId
    };
};

export const flagComment = ({ flaggedComment, community, school, postId, currentUser, originalComment }) => {
    const databaseCommentFlag = firebase.database()
        .ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}/flags`);
    return (dispatch) => {
        databaseCommentFlag
            .push({ flaggedBy: `${currentUser}` });
        firebase.database()
            .ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}/flaggedComment`)
            .set({ originalComment });
        databaseCommentFlag
            .on('value', snapshot => {
                dispatch({ type: CLEAR_COMMENT_PROMPT });
                if (snapshot.numChildren() === 3) {
                    firebase.database()
                        .ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}/comment`)
                        .set('This comment has been flagged.');
                    firebase.database()
                        .ref(`/locations/${school}/posts/${community}/${postId}/comments/${flaggedComment}/commentPhoto`)
                        .set('none');
                }
            });
    };
};

/*A necessary catch error for the commenting
*/
const commentSubmitFail = (dispatch) => {
    dispatch({ type: COMMENT_SUBMIT_FAIL });
};
