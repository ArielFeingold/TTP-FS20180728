import React from 'react';
import { ListGroupItem, Row } from 'reactstrap';

class StockListItem extends React.Component {

  render() {
    let lineColor = ''
    if(this.props.currentPrice >= this.props.openingPrice){
      lineColor = "text-success"
    } else {
      lineColor= "text-danger"
    }
    return(
      <ListGroupItem key={this.props} className={lineColor}>
        <Row>
        <div className="col-sm-2">{this.props.symbol} -</div>
        <div className="col-sm-4">{this.props.userShares} Shares</div>
        <div className="col-sm-6">{this.props.currentPrice * this.props.userShares}</div>
        </Row>
      </ListGroupItem>
    )
  }
}

export default StockListItem;
