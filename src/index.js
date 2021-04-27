import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { HashRouter, Redirect, Route, Switch  } from "react-router-dom"; 
import Login from './Login';
// import "./assets/scss/material-dashboard-pro-react.scss?v=1.7.0";  
// import Home from './HomePage/TestHome';
import Home from './components/SimpleCard';
import PrivateRoute from './Authentication'; 
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <>
    <HashRouter>
        <Switch>      
          <PrivateRoute  path="/Home" component={Home} />  
          <Route path="/login" component={Login}/>
          <Route path="/Home" component={Home}/>
          <Redirect from="/" to="/login" />
        </Switch>
    </HashRouter>
  </>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
