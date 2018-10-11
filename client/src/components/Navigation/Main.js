import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import Login from '../../containers/auth/Login'
import Signup from '../../containers/auth/Signup'
import Logout from '../../containers/auth/Logout'
import Protfolio from '../../containers/Protfolio/Protfolio'
import Transactions from '../../containers/Transactions/Transactions'
import NoAccess from './NoAccess'


const Main = () => (
  <main>
    <Switch>
      <Route path='/login' exact component={Login}/>
      <Route path='/signup' exact component={Signup}/>
      <Route path="/logout" exact component={Logout} />
      <Route path="/protfolio" exact component={Protfolio} />
      <Route path="/transactions" exact component={Transactions} />
      <Route path="/no-access" exact component={NoAccess} />
      <Route path='/' exact component={Login}/>
      <Redirect to="/" />
    </Switch>
  </main>
)

export default Main
