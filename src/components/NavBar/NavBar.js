import { NavLink } from "react-router-dom"
import './navBar.css'

const NavBar = ()=>{
    return(
        <div className="navBar-ctn">
            <NavLink>Home</NavLink>
            <NavLink>Options</NavLink>
            <NavLink>Volume</NavLink>
            <NavLink>Exit</NavLink>
        </div>
    )
}
export default NavBar;