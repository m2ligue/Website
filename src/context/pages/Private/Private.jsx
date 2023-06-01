import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { UserContext } from '../../../context/usercontext'

const Private = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default Private;

/*import React, { useContext } from 'react';
import { UserContext } from '../context/usercontext';

const Private = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      {user ? (
        <h1>Welcome, {user.email}!</h1>
      ) : (
        <h1>Please log in to access this page.</h1>
      )}
    </div>
  );
};

export default Private;*/