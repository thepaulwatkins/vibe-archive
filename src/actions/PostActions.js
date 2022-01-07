/*This file contains all of the actions relating to post creation and the
*ability to join a community
*/
import firebase from 'firebase';
import { 
    POST_UPDATE, 
    POST_RESET,
    IMAGE_UPDATE,
    FETCH_POSTS,
    POST_SUBMIT_FAIL,
    SHOW_PROMPT,
    CLEAR_PROMPT,
    SHOW_DELETE_PROMPT,
    CLEAR_DELETE_PROMPT,
    GET_FLAG_ID
 } from './types';

 /*This action keeps track of the changes made as the user creates their post
 */
export const postUpdate = ({ prop, value }) => {
    return {
        type: POST_UPDATE,
        payload: { prop, value }
    };
};

/*This action adds the user's post and username into firebase
*/
export const postSubmit = ({ post, name, photo, postDate, userId, community, school, numComments }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/posts/${community}`)
        .push({ post, name, photo, postDate, userId, numComments })
        .then(() => {
            dispatch({ type: POST_RESET });
        })
        .catch(() => postSubmitFail(dispatch));
    };
};

/*This action updates the 'photo' prop is a new photo is selected to post
*/
export const imageUpdate = ({ prop, value }) => {
    return {
        type: IMAGE_UPDATE,
        payload: { prop, value }
    };
};

/*This action is called to access the posts in order to display them when the component renders
*/
export const getPosts = ({ community, school }) => {
    const userPosts = firebase.database().ref(`/locations/${school}/posts/${community}`);
    return (dispatch) => {
            userPosts.on('value', snapshot => {
            dispatch({ type: FETCH_POSTS, payload: snapshot.val() });
        });
    };
};

/*When this action is called, the modal prompting the user to flag a post or join a community appears
*/
export const showPrompt = () => {
    return {
        type: SHOW_PROMPT
    };
};

export const showDeletePrompt = () => {
    return {
        type: SHOW_DELETE_PROMPT
    };
};

export const declineDeletePrompt = () => {
    return {
        type: CLEAR_DELETE_PROMPT
    };
};

/*Add the type of community to the user's folder and add the user's
*email to the community member list
*/
export const addMember = ({ userId, community, school, userName }) => {    
    return (dispatch) => {
        const { currentUser } = firebase.auth();
        firebase.database().ref(`/locations/${school}/users/${currentUser.uid}/communities`)
            .push({ community });
        firebase.database().ref(`/locations/${school}/members/${community}`)
            .push({ userId, userName })
            .then(() => {
                dispatch({ type: CLEAR_PROMPT });
            });
    };
};

/*When this action is called, the modal prompting the user to join a
*community is will no longer be visible
*/
export const declinePrompt = () => {
    return {
        type: CLEAR_PROMPT
    };
};

export const getFlagId = (flagId) => {
    return {
        type: GET_FLAG_ID,
        payload: flagId
    };
};

export const flagPost = ({ flaggedPost, community, school, flagger, originalPost }) => {
    const databaseFlag = firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}/flags`);
    const databaseOriginal = firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}/flaggedPost`);
    return (dispatch) => {
        databaseFlag
            .push({ flaggedBy: `${flagger}` });
        databaseOriginal
            .set({ originalPost });
        databaseFlag
            .on('value', snapshot => {
                dispatch({ type: CLEAR_PROMPT });
                if (snapshot.numChildren() === 3) {
                    firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}/post`)
                        .set('This post has been flagged.');
                    firebase.database().ref(`/locations/${school}/posts/${community}/${flaggedPost}/photo`)
                        .set('none');
                }
            });
    };
};

/*A function within the catch statement 
*/
const postSubmitFail = (dispatch) => {
    dispatch({ type: POST_SUBMIT_FAIL });
};
