import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';
import CardDetail from './components/CardDetail/CardDetail.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/home" component={Home} />
        <Route path="/pokemon/:id" component={CardDetail} />
      </Switch>
    </div>
  )
}

export default App



