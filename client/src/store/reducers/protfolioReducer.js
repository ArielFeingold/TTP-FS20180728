import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';
import Spinner from '../../components/UI/Spinner'

const initialState = {
  username: null,
  balance: null,
  balanceId: null,
  userStocks: [],
  loading: false,
  addStockError: null,
};

const getProtfolioStart = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: true
  });
}


const getProtfolioSuccess = ( state, action ) => {
  return updateObject( state, {
    errors: null,
    loading: false,
    userStocks: action.userStocks
   });
}

const getProtfolioFail = ( state, action ) => {
  return updateObject( state, {
    errors: action.errors,
    loading: false
    }
  );
}

const setUser = ( state, action ) => {
  return updateObject( state, {
    username: action.username,
    balance: action.balance,
    balanceId: action.balance.balance
  });
}

const addStockStart = ( state, action ) => {
  return updateObject( state, {
    addStockError: null,
    loading: true,
  });
}

const addStockSuccess = ( state, action ) => {
  return updateObject( state, {
    addStockError: null,
    balance: action.balance,
    loading: false
  });
}

const addStockFail = ( state, action ) => {
  return updateObject( state, {
    addStockError: action.error,
    loading: false
    }
  );
}

const refreshToggle = ( state, action ) => {
  return updateObject( state, {
    refresh: action.refresh
    }
  );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GET_PROTFOLIO_START: return getProtfolioStart(state, action);
        case actionTypes.GET_PROTFOLIO_SUCCESS: return getProtfolioSuccess(state, action);
        case actionTypes.GET_PROTFOLIO_FAIL: return getProtfolioFail(state, action);

        case actionTypes.ADD_STOCK_START: return addStockStart(state, action);
        case actionTypes.ADD_STOCK_SUCCESS: return addStockSuccess(state, action);
        case actionTypes.ADD_STOCK_FAIL: return addStockFail(state, action);

        case actionTypes.SET_USER: return setUser(state, action);

        default:
            return state;
    }
};

export default reducer;
