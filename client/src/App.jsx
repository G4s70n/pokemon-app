import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CardDetail from './components/CardDetail/CardDetail.jsx';
import Create from './components/Create/Create.jsx';
import About from './components/About/About.jsx';
import NotFound from './components/NotFound/NotFound.jsx';


function App() {

  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/home-page=:page?" component={Home} /> 
        <Route path="/pokemon/:id" component={CardDetail} />
        <Route exact path="/create" component={Create} />
        <Route exact path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
  }  

export default App



