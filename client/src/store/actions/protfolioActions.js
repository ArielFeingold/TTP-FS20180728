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

export const setUser = ( username, balance ) => {
    return {
        type: actionTypes.SET_USER,
        username: username,
        balance: balance
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
    let stocksString = ''
    let batchQuery = ``
    axios.get(url, {headers: headers})
    .then(
      response => {
        dispatch(setUser(response.data.username, response.data.balance));
        localStorage.setItem('balance', response.data.balance);
        let arrayForString = response.data.stocks;
        response.data.stocks.forEach(stck => {
          userStocks.push(stck)
        });
        if(arrayForString.length > 0){
          arrayForString.forEach( stock => {
            stocksString = stocksString + `${stock.symbol},`
          });
      }
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
  export const addStockSuccess = (newBalance) => {
      return {
          type: actionTypes.ADD_STOCK_SUCCESS,
          newBalance: newBalance
      };
  };

  export const addStockFail = (error) => {
      return {
          type: actionTypes.ADD_STOCK_FAIL,
          error: error
      };
  };

  export const addStock = ( ticker, qty) => {
    return dispatch => {
      localStorage.setItem('qty', qty);
      const url = `https://api.iextrading.com/1.0/stock/${ticker}/price`
      axios.get(url)
      .then( response => {
        const qty = localStorage.getItem('qty')
        const balance = localStorage.getItem('balance')
        const total = response.data * qty
        if( total > balance) {
          dispatch(addStockFail("Insufficient Funds"))
        } else {
          let newBalance = balance - total
          dispatch(addStockSuccess(newBalance))
          const token = localStorage.getItem('token')
          const headers = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
          const userId = localStorage.getItem('userId')
          const url = `http://localhost:3001/users/${userId}`
          const data =
            { user: {
              balance: newBalance
            }
          }
          return(axios.patch(url, data, {headers: headers}))
        }
      })
      .then(response => console.log(response.data))
      .catch(error => dispatch(addStockFail(error.message)))
    }
  };
