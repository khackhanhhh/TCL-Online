import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListGames from './components/game/list-game.component';
import ListRound from './components/round/list-round-byGameId.component';
import Navbar from './layout/navbar.layout';

function App() {
  return (
    <div className="App container-xxl ml-5 mr-5">
      <Navbar />
      <Router>   
        <div className=''>
        <Route path="/" exact component={ListGames} />
        <Route path='/rounds/game/:id' component={ListRound} />
        </div>
      </Router>
    </div>
  );
}

export default App;
