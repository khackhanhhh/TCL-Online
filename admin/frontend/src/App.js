import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListGames from './components/game/list-game.component';
import CreateGame from './components/game/create-game.component';
import EditGame from './components/game/edit-game.component';
import ListRound from './components/round/list-round-byGameId.component';
import CreateRound from './components/round/create-round.component';
import EditRound from './components/round/edit-round.component';
import Navbar from './components/layout/navbar.layout';

function App() {
  return (
    <div className="App container-xxl ml-5 mr-5">
      <Navbar /> 
      <Router>   
        <div className=''>
        <Route path="/" exact component={ListGames} />
        <Route path="/create" component={CreateGame} />
        <Route path="/games/edit/:id" component={EditGame} />
        <Route path='/rounds/game/:id' component={ListRound} />
        <Route path='/round/create/:id' component={CreateRound} />
        <Route path='/rounds/edit/:id' component={EditRound} />
        </div>
      </Router>
    </div>
  );
}

export default App;
