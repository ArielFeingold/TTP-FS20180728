import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    signupError: null,
    loginError: null,
    loading: false,
    authRedirectPath: '/',
    isNewSignup: false
};
