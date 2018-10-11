import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Alert, Container, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import BodyBackgroundColor from 'react-body-backgroundcolor'
import StockListItem from '../../components/Protfolio/StockListItem'
import Spinner from '../../components/UI/Spinner'
import { Redirect } from 'react-router-dom';

class Protfolio extends Component {

  state = {
    ticker: '',
    qty: '',
    modal: false
  }

  componentDidMount = () => {
    this.props.getProtfolio();
  };

  handleTextChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  handleSubmit = ( event ) => {
    event.preventDefault();
    this.props.onAdd(this.state.ticker, this.state.qty)
    this.setState({
      ticker: '',
      qty: ''
    })
  }

  render() {
    let spinner = null;
    if ( this.props.loading ) {spinner = <Spinner />}

    let errorMessage = null;
    if(this.props.addStockError !== null){
      errorMessage =
      <Alert color="danger">
        {this.props.addStockError}
      </Alert>
    }

    let userStocks = [];
    if(this.props.userStocks) {
      userStocks = this.props.userStocks.map(stock =>
        <StockListItem
          symbol={stock.symbol}
          key={stock.id}
          openingPrice={stock.openingPrice}
          currentPrice={stock.currentPrice}
          userShares={stock.userShares}
        />
        )
    }

    let userValue = "Has No Stocks"
    if(this.props.userStocks.length > 0){
      let array = this.props.userStocks, sum = 0;
      array.forEach(stock => {
        sum = sum + (stock.currentPrice * stock.userShares)
      })
      userValue = sum.toFixed(2)
    }

    let authRedirect = null;
    if ( !this.props.isAuthenticated ) {
        authRedirect = <Redirect to="/no-access" />
    }

    return(
      <Container className="mt-5 ml-5 mr-5 ">
        {authRedirect}
        {spinner}
        <div className="row">
          <div className="col-md-7 mb-5">
            <h4 className="mb-2 pl-2">Protfolio   {userValue}</h4>
            <ListGroup flush>
              {userStocks}
            </ListGroup>
          </div>
        <div className="col-md-5">
          <h4 className="mb-2 pl-2">Cash {this.props.balance}</h4>
          {errorMessage}
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
            <Input type="text" name="ticker" placeholder="Ticker" value={this.state.ticker} onChange={this.handleTextChange} />
            </FormGroup>
            <FormGroup>
            <Input type="number" min="0" step="1" name="qty" placeholder="Qty" value={this.state.qty} onChange={this.handleTextChange}/>
            </FormGroup>
            <Button block type="submit" value="submit">Buy</Button>
          </Form>
        </div>
      </div>
    </Container>
    )
  }
}

const mapStateToProps = state => {
    return {
      userStocks: state.protfolio.userStocks,
      loading: state.protfolio.loading,
      balance: state.protfolio.balance,
      addStockError: state.protfolio.addStockError,
      isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getProtfolio: () => dispatch(actions.getProtfolio()),
      onAdd: (ticker, qty) => dispatch(actions.addStock( ticker, qty)),
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) (Protfolio)
