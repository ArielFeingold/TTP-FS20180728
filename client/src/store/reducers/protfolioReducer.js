import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  username: null,
  balance: null,
  userStocks: [],
  loading: false,
  errors: null
};

const getProtfolioStart = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: true }
  );
}

const setUser = ( state, action ) => {
  return updateObject( state, {
    username: action.username,
    balance: action.balance
    }
  );
}

const getProtfolioSuccess = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: false,
    userStocks: action.userStocks
   } );
}

const getProtfolioFail = ( state, action ) => {
  return updateObject( state, {
    errors: action.errors,
    loading: false }
  );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_PROTFOLIO_START: return getProtfolioStart(state, action);
        case actionTypes.GET_PROTFOLIO_SUCCESS: return getProtfolioSuccess(state, action);
        case actionTypes.GET_PROTFOLIO_FAIL: return getProtfolioFail(state, action);
        case actionTypes.SET_USER: return setUser(state, action);

        default:
            return state;
    }
};

export default reducer;
