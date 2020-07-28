import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './component/layout/Navbar';
import Alerts from './component/layout/Alerts';
import Home from './component/pages/Home';
import About from './component/pages/About';
import Register from './component/auth/Register';
import Login from './component/auth/Login';
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './component/routing/PrivateRoute'

// to run: npm run dev

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  return (
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Alerts />
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Fragment>
      </Router>
  );
}

export default App;
