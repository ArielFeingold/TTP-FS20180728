import React from 'react';
import { Redirect } from 'react-router-dom';


const NoAccess = () => {
  return(<Redirect to="/login" />)
}

export default NoAccess
