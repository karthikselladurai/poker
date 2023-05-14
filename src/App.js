//eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import SingleBoard from "./signleBoard/SigneBoard";
import CreateRoom from './createRoom/CreateRoom'

import './App.css';

function App() {
  
  return (
    <Router>
      <div className="layout-route">
        <Layout />
        <div>
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/game' element={ <Gamescreen /> } />
            <Route path='/createRoom/game1' element={ <SingleBoard /> } />
            <Route path='/createRoom/game1/:roomId' element={ <SingleBoard /> } />
            <Route path='/createRoom' element={ <CreateRoom /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
