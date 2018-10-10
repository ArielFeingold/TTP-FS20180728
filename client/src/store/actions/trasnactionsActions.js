import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getTransactionsStart = () => {
    return {
        type: actionTypes.GET_TRANSACTIONS_START
    };
};

export const getTransactionsSuccess = ( userTrades ) => {
    return {
        type: actionTypes.GET_TRANSACTIONS_SUCCESS,
        userTrades: userTrades
    };
};

export const getTransactionsFail = (errors) => {
    return {
        type: actionTypes.GET_TRANSACTIONS_FAIL,
        errors: errors
    };
};

export const getTransactions = () => {
  return dispatch => {
    dispatch(getTransactionsStart)
    const url = `http://localhost:3001/trades`
    axios.get(url)
    .then(result => {
      getTransactionsSuccess(result.data)
    })
    .catch(error => {
    if (error.response) {
      dispatch(getTransactionsFail(error.response.data));
    } else if (error.request) {
      dispatch(getTransactionsFail("Could Not Connect To Server"));
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  })
  }
}
