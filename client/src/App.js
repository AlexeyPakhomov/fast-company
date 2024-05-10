import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/ui/NavBar';
import Main from './layouts/Main';
import Login from './layouts/Login';
import Users from './layouts/Users';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/ProtectedRoute';
import LogOut from './layouts/LogOut';
import AppLoader from './components/ui/hoc/appLoader';

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <Switch>
            <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route path="/" exact component={Main} />
            <Route path="/logout" component={LogOut} />
            <Redirect to="/" />
          </Switch>
        </Switch>
      </AppLoader>
      <ToastContainer theme="dark" />
    </>
  );
};

export default App;
