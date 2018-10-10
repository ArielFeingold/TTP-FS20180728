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

}
