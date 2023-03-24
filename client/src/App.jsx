import { useState } from 'react'
import { Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar/NavBar.jsx';
import LandingPage from './components/LandingPage/LandingPage.jsx';
import Home from './components/Home/Home.jsx';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <NavBar />
      <Route exact path="/"> <LandingPage /> </Route>
      <Route exact path="/home"> <Home /> </Route>
    </div>
  )
}

export default App



