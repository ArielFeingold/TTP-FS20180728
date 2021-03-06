import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';
import Spinner from '../../components/UI/Spinner'
import { Redirect } from 'react-router-dom';

class Transactions extends Component {

  componentDidMount = () => {
    this.props.getTransactions();
  };

  render(){

    let spinner = null;
    if ( this.props.loading ) {spinner = <Spinner />}

    let userTransactions = ["No Transaction History"];
    if(this.props.userTransactions) {
      userTransactions = this.props.userTransactions.map(ta =>
        <ListGroupItem key={ta.id}>BUY ({ta.symbol.toUpperCase()}) - {ta.amount} Shares @{ta.price}</ListGroupItem>
        )
    }

    let authRedirect = null;
    if ( !this.props.isAuthenticated ) {
        authRedirect = <Redirect to="/no-access" />
    }

    return(
      <Container className="mt-5 ml-5 mr-5">
        {authRedirect}
        {spinner}
        <h1>Transactions</h1>
        <ListGroup>
          {userTransactions}
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => {
    return {
      userTransactions: state.transactions.userTransactions,
      isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return {
      getTransactions: () => dispatch(actions.getTransactions())
    };
};

export default connect( mapStateToProps, mapDispatchToProps ) (Transactions)
