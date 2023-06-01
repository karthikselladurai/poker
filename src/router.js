import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import SingleBoard from "./components/signleBoard/SigneBoard";
import Home from './components/home/Home';
import  ProtectedRoute from "./service/protectedRoute";
import GameLayout from "./views/game/GameLayot";
import Options from "./components/signleBoard/option/Options";
const AppRouter = () => {

    return (
        <Router>
          <Routes>
            <Route path='/' element={ <Login /> } />
            {/* <Route path='/home' element={<Home />} /> */}
            <Route path ='/game' element={<GameLayout/>}>
                <Route index element={<SingleBoard />} />
                <Route path="/game/option" element={<Options/>}/>
                {/* <Route path='/game/board' element={<SingleBoard />} /> */}
            </Route>
            <Route path='/game1' element={ <Gamescreen /> } />
           
            <Route path='/createRoom/game1/:roomId' element={ <SingleBoard /> } />
            <Route path='/createRoom' element={ <Home /> } />
          </Routes>
    </Router>
    );
};
export default AppRouter;