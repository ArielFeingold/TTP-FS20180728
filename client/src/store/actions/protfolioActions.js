import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProtfolioStart = () => {
    return {
        type: actionTypes.GET_PROTFOLIO_START
    };
};

export const setUserStocks = ( userStocks ) => {
    return {
        type: actionTypes.SET_USER_STOCKS,
        userStocks: userStocks
    };
};

export const getProtfolioSuccess = ( output ) => {
    return {
        type: actionTypes.GET_PROTFOLIO_SUCCESS,
        output: output
    };
};

export const getProtfolioFail = (errors) => {
    return {
        type: actionTypes.GET_PROTFOLIO_FAIL,
        errors: errors
    };
};

export const getProtfolio = (userId) => {
  return dispatch => {
    dispatch(getProtfolioStart());
    const token = localStorage.getItem('token');
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`};
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:3001/users/${userId}`;
    let stocksString = '';
    let batchQuery = ``;
    let output = [];
    axios.get(url, {headers: headers})
    .then( (response) => {
        const stocks = response.data.stocks
        dispatch(setUserStocks(stocks));
        if(stocks.length > 0){
          stocks.forEach( stock => {
            stocksString = stocksString + `${stock.symbol},`
          });
      };
      batchQuery = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocksString}&types=price,ohlc`

      return(axios.get(batchQuery));
    })
    .then(
      response => {
          let item;
          const input = response.data;
          for(let symbol in input) {
            item = {};
            item.symbol = symbol;
            item.currentPrice = input[symbol]["price"];
            item.openingPrice = input[symbol]["ohlc"]["open"]["price"];
            output.push(item);
            }
        dispatch(getProtfolioSuccess(output))
      })
    .catch(error => console.log(error.message))
  }
}
