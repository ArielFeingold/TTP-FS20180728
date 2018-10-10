import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Container, ListGroup, ListGroupItem } from 'reactstrap';

class Transactions extends Component {

  render(){
    return(
      <Container className="mt-5 ml-5 mr-5">
        <h1>Transactions</h1>
        <ListGroup>
          <ListGroupItem>Cras justo odio</ListGroupItem>
          <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
          <ListGroupItem>Morbi leo risus</ListGroupItem>
          <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
          <ListGroupItem>Vestibulum at eros</ListGroupItem>
        </ListGroup>
      </Container>
    )
  }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps ) (Transactions)
