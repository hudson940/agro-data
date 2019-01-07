import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authRef } from '../firebase';

export default function PrivateRoute({ component: Component, ...rest }) {
  const user = authRef.currentUser;
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
            //push={true}
          />
        )
      }
    />
  );
}
