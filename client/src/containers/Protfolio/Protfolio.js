import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Container, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import BodyBackgroundColor from 'react-body-backgroundcolor'
import StockListItem from '../../components/Protfolio/StockListItem'

class Protfolio extends Component {

  componentDidMount = () => {
    this.props.getProtfolio();
  };

  render() {
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

    let userValue = "Not Available"
    if(this.props.userStocks.length > 0){
      let valueArray = [];
      this.props.userStocks.map(stock => {
        const num = stock.currentPrice * stock.userShares
        valueArray.push(num)
      })
      if(valueArray.length = 1){
        userValue = valueArray[0]
      } else {
        userValue = valueArray.reduce()
      }
    }

    return(
      <Container className="mt-5 ml-5 mr-5">
        <div className="row">
          <div className="col-md-7 mb-5">
            <h4 className="mb-2 pl-2">Protfolio {userValue}</h4>
            <ListGroup flush>
              {userStocks}
            </ListGroup>
          </div>
        <div className="col-md-5">
          <h4 className="mb-2 pl-2">Cash - $1234.24</h4>
        <Form >
            <FormGroup>
            <Input type="text" name="ticker" placeholder="Ticker" />
            </FormGroup>
            <FormGroup>
            <Input type="number" name="quantity" placeholder="Qty" />
            </FormGroup>
            <Button block>Buy</Button>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getProtfolio: () => dispatch(actions.getProtfolio())
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) (Protfolio)
