import * as actionTypes from './actionTypes';
import axios from 'axios';

export const getProtfolioStart = () => {
    return {
        type: actionTypes.GET_PROTFOLIO_START
    };
};

export const getProtfolioSuccess = ( userStocks ) => {
    return {
        type: actionTypes.GET_PROTFOLIO_SUCCESS,
        userStocks: userStocks
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
    dispatch(getProtfolioStart())
    const token = localStorage.getItem('token')
    const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
    const userId = localStorage.getItem('userId')
    const url = `http://localhost:3001/users/${userId}`
    let userStocks = []
    let stocksWithPricing = []
    let stocksString = ''
    let batchQuery = ``
    axios.get(url, {headers: headers})
    .then(
      response => {
        let arrayForString = response.data.stocks;
        const lastStock = arrayForString.pop();

        response.data.stocks.forEach(stck => {
          userStocks.push(stck)
        });

        if(arrayForString.length > 0){
          arrayForString.forEach( stock => {
            stocksString = stocksString + `${stock.symbol},`
          });
      }
      stocksString = stocksString + lastStock.symbol;
      batchQuery = `https://api.iextrading.com/1.0/stock/market/batch?symbols=${stocksString}&types=price,ohlc`

      return(axios.get(batchQuery));
    })
    .then(
      response => {
          const input = response.data;
          let output = [], item, current;
          for(let symbol in input) {
            item = {};
            item.symbol = symbol;
            item.currentPrice = input[symbol]["price"];
            item.openingPrice = input[symbol]["ohlc"]["open"]["price"];
            
            if(typeof userStocks.find(userStocks => userStocks.symbol === item.symbol) !== 'undefined' ){
              item.userShares = userStocks.find(userStocks => userStocks.symbol === item.symbol).user_shares;
              item.id = userStocks.find(userStocks => userStocks.symbol === item.symbol).id;
            }
            output.push(item);
            }
        dispatch(getProtfolioSuccess(output))
      })
    .catch(error => console.log(error.message))
  }
}
