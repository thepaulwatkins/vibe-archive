/*This file contains all of the actions relating to resource creation */
import firebase from 'firebase';
import { 
    SHOW_RESOURCE_PROMPT, 
    CLEAR_RESOURCE_PROMPT,
    RESOURCE_TYPE_UPDATE,
    RESOURCE_NAME_UPDATE,
    RESOURCE_DESCRIPTION_UPDATE,
    RESOURCE_RESET,
    FETCH_RESOURCES,
    FLAG_RESOURCE,
    CLEAR_FLAG_RESOURCE,
    GET_RESOURCE_FLAG_ID
 } from './types';

 /*When this action is called, the modal prompting the user to add a resource appears
*/
export const showResourcePrompt = () => {
    return {
        type: SHOW_RESOURCE_PROMPT
    };
};

 /*When this action is called, the modal prompting the user to add a resource goes away
*/
export const declineResourcePrompt = () => {
    return {
        type: CLEAR_RESOURCE_PROMPT
    };
};

/*This action keeps track of the changes made as the user creates their resource type
 */
export const resourceTypeUpdate = ({ prop, value }) => {
    return {
        type: RESOURCE_TYPE_UPDATE,
        payload: { prop, value }
    };
};

/*This action keeps track of the changes made as the user creates their resource name
 */
export const resourceNameUpdate = ({ prop, value }) => {
    return {
        type: RESOURCE_NAME_UPDATE,
        payload: { prop, value }
    };
};

/*This action keeps track of the changes made as the user creates their resource description
 */
export const resourceDescriptionUpdate = ({ prop, value }) => {
    return {
        type: RESOURCE_DESCRIPTION_UPDATE,
        payload: { prop, value }
    };
};

/*This action adds the user's resource into firebase
*/
export const resourceSubmit = ({ resourceType, resourceName, resourceDescription, resourceDate, school, userId, userName, numComments }) => {
    return (dispatch) => {
        firebase.database().ref(`/locations/${school}/resources`)
        .push({ resourceType, resourceName, resourceDescription, resourceDate, userId, userName, numComments })
        .then(() => {
            dispatch({ type: RESOURCE_RESET });
        })
    };
};

/*This action is called to access the resources in order to display them when the component renders
*/
export const getResources = ({ school }) => {
    const resourceDatabase = firebase.database().ref(`/locations/${school}/resources`);
    return (dispatch) => {
        resourceDatabase.on('value', snapshot => {
            dispatch({ type: FETCH_RESOURCES, payload: snapshot.val() });
        });
    };
};

export const flagResource = () => {
    return {
        type: FLAG_RESOURCE
    };
};

export const clearFlagResource = () => {
    return {
        type: CLEAR_FLAG_RESOURCE
    };
};

export const getResourceFlagId = (resourceFlagId) => {
    return {
        type: GET_RESOURCE_FLAG_ID,
        payload: resourceFlagId
    };
};
