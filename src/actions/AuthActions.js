/*This file contains all the actions relating to the user's authentificaiton
*/
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    EMAIL_CHANGED, 
    PASSWORD_CHANGED,
    NAME_CHANGED,
    LOGIN_USER_SUCCESS,
    SIGNUP_USER_SUCESS,
    SIGNUP_USER_FAIL,
    LOGIN_USER_FAIL,
    LOGIN_USER
} from './types';

/*Action handler for the text input field for 'email' changes. 
*Update the value of email with the given text
*/
export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    };
};

/*Action handler for the text input field for 'password' changes. 
*Update the value of password with the given text
*/
export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

/*Action handler for the text input field for 'username' changes. 
*Update the value of username with the given text
*/
export const nameChanged = (text) => {
    return {
        type: NAME_CHANGED,
        payload: text
    };
};

/*Login the user with the entered email and password. If incorrect,
*throw an error
*/
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch(() => loginUserFail(dispatch));
    };
};

/*Signup the user with the entered email, password, and username. If incorrect,
*throw an error. If the information is valid, create a new firebase account
*/
export const signupUser = ({ school, email, password, name, hasCommented }) => {
    const db = firebase.database();
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({ type: SIGNUP_USER_SUCESS, payload: user });
                const { currentUser } = firebase.auth();
                db.ref(`/locations/${school}/users/${currentUser.uid}/`)
                    .set({ name, school, hasCommented });
                db.ref(`/users/${currentUser.uid}`)
                    .set({ name, school });
                Actions.intro({ userName: name, school });
            })
            .catch(() => signupUserFail(dispatch));
    };
};

/*If login info is wrong, let them know
*/
const loginUserFail = (dispatch) => {
    dispatch({ type: LOGIN_USER_FAIL });
};

const signupUserFail = (dispatch) => {
    dispatch({ type: SIGNUP_USER_FAIL });
};

/*If login is successful, navigate to the home page
*/
const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
};
