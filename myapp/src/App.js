import React from 'react';
import {Route,Switch} from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import RouteGuard from './component/RouteGuard'
function App() {
   var handleBeforeChange = (preLocation,nextLocation,action,confirm) => {
      console.log(`页面从${preLocation.pathname}跳转到${nextLocation.pathname}跳转行为为${action}`)
      confirm(true)
   }
  return (
     <RouteGuard onBeforeChange = {
      handleBeforeChange
     }
     onChange={(preLocation,nextLocation,action,unListen) => {console.log('ok')}} >
        <Switch>
            <Route path='/login' exact component={Login}></Route>
            <Route path='/' component={Admin}></Route>
        </Switch>
     </RouteGuard>
  );
}

export default App;
