//eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Login from './components/authentication/Login'
import Layout from './components/layout/Layout'
import Gamescreen from './components/gamescreen/Gamescreen'
import SingleBoard from "./components/signleBoard/SigneBoard";
import Home from './components/home/Home';
import  ProtectedRoute from "./service/protectedRoute";
import AppRouter from "./router";

import './App.css';

function App() {
  
  return (
    <AppRouter/>
  );
}

export default App;
