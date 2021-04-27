import React from 'react'; 
import { Redirect, Route } from "react-router-dom"; 

function PrivateRoute ({component: Component, authed, ...rest}) {
    var auth = localStorage.getItem('authBill');
    return (
      <Route
        {...rest}
        render={(props) => auth === "true"
          ? <Component {...props} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }

export default PrivateRoute;