import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  userTransactions: null
};

const getTransactionsStart = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: true
  });
}


const getTransactionsSuccess = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: false,
    userTrades: action.userTrades
   });
}

const getTransactionsFail = ( state, action ) => {
  return updateObject( state, {
    errors: action.errors,
    loading: false
    }
  );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_TRANSACTIONS_START: return getTransactionsStart(state, action);
        case actionTypes.GET_TRANSACTIONS_SUCCESS: return getTransactionsSuccess(state, action);
        case actionTypes.GET_TRANSACTIONS_FAIL: return getTransactionsFail(state, action);

        default:
            return state;
    }
};

export default reducer;
