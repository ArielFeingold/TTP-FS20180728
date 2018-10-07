import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  stocks: null,
  output: [],
  loading: false,
  errors: null
};

const getProtfolioStart = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: true }
  );
}

const getProtfolioSuccess = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: false,
    output: action.output
   } );
}

const setUserStocks = ( state, action ) => {
    return updateObject( state, {
      stocks: action.userStocks
    });
};

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
        case actionTypes.SET_USER_STOCKS: return setUserStocks(state, action);

        default:
            return state;
    }
};

export default reducer;
