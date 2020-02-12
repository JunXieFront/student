import React from 'react';
import {Route, BrowserRouter as Router,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
function App() {
  return (
     <Router>
        <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/' component={Admin}></Route>
        </Switch>
     </Router>
  );
}

export default App;
