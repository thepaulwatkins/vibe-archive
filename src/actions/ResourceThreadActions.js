/*This file contains all the actions relating to resource threads
*/
import firebase from 'firebase';
import {
    RESOURCE_COMMENT_UPDATE,
    RESOURCE_COMMENT_IMAGE_UPDATE,
    RESOURCE_COMMENT_RESET,
    RESOURCE_COMMENT_SUBMIT_FAIL,
    FETCH_RESOURCE_COMMENTS,
    SHOW_RESOURCE_COMMENT_PROMPT,
    CLEAR_RESOURCE_COMMENT_PROMPT,
    GET_RESOURCE_COMMENT_ID
} from './types';

/*Keeps track of the change in state as a user creates a comment
*/
export const resourceCommentUpdate = ({ prop, value }) => {
    return {
        type: RESOURCE_COMMENT_UPDATE,
        payload: { prop, value }
    };
};

/*Keeps track of the change in state as a user adds a photo to the comment
*/
export const resourceCommentImageUpdate = ({ prop, value }) => {
    return {
        type: RESOURCE_COMMENT_IMAGE_UPDATE,
        payload: { prop, value }
    };
};

/*When the user submits the comment for the resource, add it to the firebase database */
export const resourceSubmitComment = ({ resourceComment, resourceCommentPhoto, name, resourceCommentUserId, isOriginalPoster, uid, school }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/resources/${uid}/comments`)
        .push({ resourceComment, resourceCommentPhoto, name, resourceCommentUserId, isOriginalPoster })
        .then(() => {
            dispatch({ type: RESOURCE_COMMENT_RESET });
        })
        .catch(() => resourceCommentSubmitFail(dispatch));
    };
};

/*Fetch the list of comments for each respective resoure */
export const getResourceComments = ({ uid, school }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/resources/${uid}/comments`)
            .on('value', snapshot => {
                dispatch({ type: FETCH_RESOURCE_COMMENTS, payload: snapshot.val() });
            });
    };
};

export const showResourceCommentPrompt = () => {
    return {
        type: SHOW_RESOURCE_COMMENT_PROMPT
    };
};

export const declineResourceCommentPrompt = () => {
    return {
        type: CLEAR_RESOURCE_COMMENT_PROMPT
    };
};

export const getFlagResourceCommentId = (resourceCommentId) => {
    return {
        type: GET_RESOURCE_COMMENT_ID,
        payload: resourceCommentId
    };
};

export const flagResourceComment = ({ flaggedResourceComment, school, resourceId, currentUser, originalResourceComment }) => {
    const databaseResourceCommentFlag = firebase.database()
        .ref(`/locations/${school}/resources/${resourceId}/comments/${flaggedResourceComment}/flags`);
    return (dispatch) => {
        databaseResourceCommentFlag
            .push({ flaggedBy: `${currentUser}` });
        firebase.database()
            .ref(`/locations/${school}/resources/${resourceId}/comments/${flaggedResourceComment}/flaggedComment`)
            .set({ originalResourceComment });
        databaseResourceCommentFlag
            .on('value', snapshot => {
                dispatch({ type: CLEAR_RESOURCE_COMMENT_PROMPT });
                if (snapshot.numChildren() === 3) {
                    firebase.database()
                        .ref(`/locations/${school}/resources/${resourceId}/comments/${flaggedResourceComment}/resourceComment`)
                        .set('This comment has been flagged.');
                    firebase.database()
                        .ref(`/locations/${school}/resources/${resourceId}/comments/${flaggedResourceComment}/resourceCommentPhoto`)
                        .set('none');
                }
            });
    };
};


/*A necessary catch error for the commenting
*/
const resourceCommentSubmitFail = (dispatch) => {
    dispatch({ type: RESOURCE_COMMENT_SUBMIT_FAIL });
};