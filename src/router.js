import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleBoard from "./signleBoard/SigneBoard";
import Home from "./home/Home";
import React from "react";
const AppRouter = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='' element={<Home />} />
                <Route path='game' element={<SingleBoard />} />
                <Route path='game' element={<SingleBoard />} />
            </Routes>
        </BrowserRouter>
    );
};
export default AppRouter;