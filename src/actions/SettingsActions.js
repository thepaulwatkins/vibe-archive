import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { 
    LOGOUT_USER, 
    LOGOUT_USER_SUCCESS 
} from './types';

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER });
        firebase.auth().signOut()
            .then(user => logoutUserSuccess(dispatch, user));
    };
};

const logoutUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGOUT_USER_SUCCESS,
        payload: user
    });

    Actions.login();
};
