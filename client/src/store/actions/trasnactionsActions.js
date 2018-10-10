import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getTransactionsStart = () => {
    return {
        type: actionTypes.GET_TRANSACTIONS_START
    };
};

export const getTransactionsSuccess = ( userTransactions ) => {
    return {
        type: actionTypes.GET_TRANSACTIONS_SUCCESS,
        userTransactions: userTransactions
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
    dispatch(getTransactionsStart())
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/trades`;
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    axios.get(url, {headers: headers})
    .then(response => {
      dispatch(getTransactionsSuccess(response.data.trades))
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
