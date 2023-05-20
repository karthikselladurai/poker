//eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import SingleBoard from "./components/signleBoard/SigneBoard";
import CreateRoom from './components/createRoom/CreateRoom';
import  ProtectedRoute from "./service/protectedRoute";

import './App.css';

function App() {
  
  return (
    <Router>
      <div className="layout-route">
        <Layout />
        <div className="test">
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path='/game' element={ <Gamescreen /> } />
            <Route path='/createRoom/game1' element={<SingleBoard />} />
            <Route path='/createRoom/game1/:roomId' element={ <SingleBoard /> } />
            <Route path='/createRoom' element={ <CreateRoom /> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
