import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route,Link,NavLink,BrowserRouter as Router} from 'react-router-dom'
import { Provider } from 'react-redux'
import Header from './component/Header'
import store from './redux/store';
import SateInfo from "./component/stateinfochart"

function App() {
  return (
    <Provider store={store}>
    <Router>
  
   
  
    <Switch>
   

   <Route exact path="/" component={Header}>
   </Route>


   <Route exact path="/info/:State" component={SateInfo}>
   </Route>
  
   </Switch>
    </Router>
  
     </Provider>
  );
}

export default App;
