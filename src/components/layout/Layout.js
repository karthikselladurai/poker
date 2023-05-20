import './Layout.css'
import { useNavigate } from 'react-router-dom';
import { store } from '../../redux/store'
import { persistStore } from 'redux-persist';
import { useDispatch, useSelector } from 'react-redux';
import { setOption, setGame } from '../../redux/reducers/navReducer';
import { useState } from 'react';

export default function Layout() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const option = useSelector((state) => state.nav.option)
    const game = useSelector((state) => state.nav.game)
    const userName = useSelector((state)=>state.auth.userName)
    const signOutHandler = () => {
        persistStore(store).purge();
        navigate('/')

    }
    const optionClickHandler = () => {

        if (option) {
            dispatch(setOption(false))
        } else {
            dispatch(setOption(true))
        }
    }
    const gameClickHandler = () => {
        if (game) {
            dispatch(setGame(false))
        } else {
            dispatch(setGame(true))
        }
    }
    return (
        <div className="layout-div">
            <div>
                <span>{userName}</span>
            </div>
            <div>
                <div>
                    <label className='logo-name'>
                        <label style={{ color: 'black', fontSize: '25px', textShadow: '0 0 5px blueviolet' }} className='logo'>DEVIL-FISH</label>
                        <label style={{ color: 'white', fontSize: '40px', textShadow: '0 0 10px black' }} className='logo'>POKER</label>
                    </label>
                </div>
                <div className='layout-label' >
                    <button onClick={optionClickHandler}>OPTIONS</button>
                </div>
                <div className='layout-label'>
                    VOLUME
                </div>
                <div className='layout-label'>
                    <button onClick={gameClickHandler}>GAME</button>
                </div>
                <div className='layout-label'>
                    <button onClick={signOutHandler}>Sign Out</button>
                </div>
                <div className='layout-label'>

                </div>
                <div className='layout-label'>

                </div>
            </div>
        </div>
    )
}