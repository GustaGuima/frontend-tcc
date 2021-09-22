import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'

import Login from './components/login/Login'
import Register from './components/login/Register'
import Profile from './components/home/Profile'
import Home from './components/home/Home'
import Exercicios from './components/exercicios/Exercicios'
import CreateExercise from './components/exercicios/CreateExercise';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='App'>
          <Route exact path='/'><Redirect to='/login'></Redirect></Route> 
          <div className='container'>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/exercicio' component={Exercicios} />
            <Route exact path='/createExercise' component={CreateExercise} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App;
