import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Canvas from './components/common/canvas';
import Welcome from './components/pages/welcome';
import Login from './components/pages/login';
import Signup from './components/pages/signup';
import Register from './components/pages/register';
import Status from './components/pages/status';

const App = () => {
  return (
    <Router>
      <Canvas>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/status" component={Status} />
        </Switch>
      </Canvas>
    </Router>
  );
};

export default App;
