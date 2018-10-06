import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Container, Button, Form, FormGroup, Label, Input, FormText, ListGroup, ListGroupItem } from 'reactstrap';
import BodyBackgroundColor from 'react-body-backgroundcolor'

class Protfolio extends Component {
  render() {
    return(
      <Container className="mt-5 ml-5 mr-5">
        <div className="row">
          <div className="col-md-7 mb-5">
            <h4 className="mb-2 pl-2">Protfolio ($5324.24)</h4>
            <ListGroup flush>
              <ListGroupItem>Cras justo odio</ListGroupItem>
              <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
              <ListGroupItem>Morbi leo risus</ListGroupItem>
              <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
              <ListGroupItem>Vestibulum at eros</ListGroupItem>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect( mapStateToProps, mapDispatchToProps ) (Protfolio)
