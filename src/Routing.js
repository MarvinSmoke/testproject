import React from 'react'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import App from './App.js'
import Login from './Login.js';


const Main = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route path='/app' component={App}/>
      </Switch>
    </BrowserRouter>
  )
  
  export default Main