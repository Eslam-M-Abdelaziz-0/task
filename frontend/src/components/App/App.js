import React from 'react';
//import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../Home/Home';
import About from '../About/About';
import Navbar from '../Navbar/Navbar';
import Contact from '../Contact/Contact';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className='container'>
      <Router basename='/'>
        {/* Add Menu Component */}
        <Navbar />

        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/about' component={About} />
          <Route path='/contact' component={Contact} />
          <Route path='/profile' component={Profile} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
