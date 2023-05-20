import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import './game.css'

const GameLayout = () => {
    return (
        <div className="page">
            <div className="page-ctn">
                <div className="navbar">
                    <NavBar />
                </div>
                <div className="main-page">
                    <div className="layer"></div>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
export default GameLayout;