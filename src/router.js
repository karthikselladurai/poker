import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import SingleBoard from "./components/signleBoard/SigneBoard";
import Home from './components/home/Home';
import  ProtectedRoute from "./service/protectedRoute";
import GameLayout from "./views/game/GameLayot";
const AppRouter = () => {

    return (
        <Router>
      {/* <div className="layout-route">
        {/* <Layout /> */}
        {/* <div className="test"> */} 
          <Routes>
            <Route path='/' element={ <Login /> } />
            <Route path ='/game' element={<GameLayout/>}>
                <Route index element={<Home />} />
            </Route>
            <Route path='/game1' element={ <Gamescreen /> } />
            <Route path='/createRoom/game1' element={<SingleBoard />} />
            <Route path='/createRoom/game1/:roomId' element={ <SingleBoard /> } />
            <Route path='/createRoom' element={ <Home /> } />
          </Routes>
        {/* </div> */}
      {/* </div> */}
    </Router>
    );
};
export default AppRouter;