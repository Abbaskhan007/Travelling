import React, { useEffect, useContext } from 'react';
import './App.css'; import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Upload from './Components/Upload';
import Contact from './Components/Contact';
import About from './Components/About';
import Header from './Components/Header';
import Home from './Components/Home';
import ProductDetails from './Components/ProductDetails'
import Login from './Components/Login';
import Cart from './Components/Cart';
import Register from './Components/Register';
import History from './Components/History';
import PrivateRoutes from './Components/PrivateRoutes'
import {UserContext} from './Store/Store'

import Axios from 'axios'


function App() {

  const [initialState, setState] = useContext(UserContext);
  const {isAuth} = initialState;
  useEffect(()=>{
    console.log('yes,,,, ?Render',isAuth)
    Axios.get("/api/user/auth").then(res=>{
      const isAuth = res.data.isAuth;
      if(res.data.isAuth){
      const {name,email,_id,cart} = res.data.user;
      console.log('res', {isAuth,email,name,_id})
      if(isAuth) return setState({...initialState,name,email,isAuth,_id,cart});
      alert('not found');   
      console.log('state', initialState)}
    })
  },[isAuth])
  
  return (
      <Router >
        <Header />
        <Switch>
          <Route path='/' exact component={Home} />
          <PrivateRoutes path='/Upload' component={Upload} />
          <Route path='/Contact' component={Contact} />
          <Route path='/About' component={About} />
          <Route path='/Register' component={Register} />
          <Route path='/Login' component={Login} />
          <Route path='/ProductDetails/:id' component={ProductDetails} />
          <PrivateRoutes path='/Cart' component={Cart} />
          <Route path='/History' component={History}/>
        </Switch>
      </Router>
  );
}

export default App;
