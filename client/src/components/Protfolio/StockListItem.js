import React from 'react';
import { ListGroupItem, Row } from 'reactstrap';

const StockListItem = (props) => {
    let lineColor = ''
    if(props.currentPrice >= props.openingPrice){
      lineColor = "text-success"
    } else {
      lineColor= "text-danger"
    }
    return(
      <ListGroupItem key={props.id} className={lineColor}>
        <Row>
        <div className="col-sm-2">{props.symbol} -</div>
        <div className="col-sm-4">{props.userShares} Shares</div>
        <div className="col-sm-6">{props.currentPrice * props.userShares}</div>
        </Row>
      </ListGroupItem>
    )
  }

export default StockListItem;
