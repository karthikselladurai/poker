import Navbar from "../../components/rummy/nav";
import { Outlet } from "react-router-dom";
import './style.css';

const Rummyhome = ()=>{
    return(
        <div className="r-home">
            <Navbar/>
            <Outlet/>
        </div>
    )
}

export default Rummyhome;