import { NavLink } from "react-router-dom"
import './navBar.css'
import { persistStore } from 'redux-persist';
import { useNavigate } from 'react-router-dom';


import { store } from '../../redux/store'


const NavBar = ()=>{
    const navigate = useNavigate();

    const exitHandler = ()=>{
        persistStore(store).purge();
        navigate('/')
    }
    return(
        <div className="navBar-ctn">
            <NavLink to='/game/poker' >Home</NavLink>
            <NavLink to='option'>Options</NavLink>
            <NavLink>Volume</NavLink>
            <button className="btn" onClick={exitHandler}>Exit</button>
        </div>
    )
}
export default NavBar;