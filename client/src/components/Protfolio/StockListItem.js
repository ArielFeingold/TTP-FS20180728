import React from 'react';
import { ListGroupItem } from 'reactstrap';

class StockListItem extends React.Component {

  render() {
    let lineColor = ''
    if(this.props.currentPrice >= this.props.openingPrice){
      lineColor = "success"
    } else {
      lineColor= "danger"
    }
    return(
      <ListGroupItem key={this.props.key} color={lineColor}>
        {this.props.symbol} - {this.props.userShares} Shares, Current Value: {this.props.currentPrice * this.props.userShares}
      </ListGroupItem>
    )
  }
}

export default StockListItem;
