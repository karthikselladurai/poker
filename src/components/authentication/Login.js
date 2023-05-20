import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import './Login.css'
import { setUserName } from '../../redux/reducers/pokerReducer';
import { signIn } from '../../redux/reducers/apiSlice';
import {setIsAuth} from '../../redux/reducers/authReducer'


export default function Login() {
    const dispatch = useDispatch();
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')
    const [userName, SetUserName] = useState('');
    const [password, SetPassword] = useState('');
    const loading = useSelector((state) => state.api.loading)

    const navigate = useNavigate();
    const goGame = () => {
        dispatch(signIn({ user_name: userName, password: password }))
            .unwrap()
            .then((resp) => {
                if (resp.status === 'Success') {
                   let data= {isAuth:true,userId:resp.data[0].user_id,userName:resp.data[0].user_name}
                    dispatch(setIsAuth(data))
                    navigate('createRoom')
                }
                setIsError(true)
                setErrorMessage(resp.message)
            })
            .catch((err) => {
                console.log("err:", err);
            })
    }
    return (
        <div className='login-div'>
            {!loading ?
                (<form name='loginForm' className='login-form'>
                    <label className='login-name'>DEVILFISH
                        <label style={{ color: 'red' }} className='login-name'> POKER</label>
                    </label>
                    <label htmlFor='login-input' className='login-input-label'>Login with your User Name</label>
                    <input
                        className='login-input'
                        id='login-input'
                        type="text"
                        placeholder='User Name'
                        value={userName}
                        onChange={(e) => SetUserName(e.target.value)}
                    />
                    <input
                        id='login-input'
                        className='login-input'
                        type="text"
                        placeholder='Password'
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}
                    />
                    <button onClick={(e) => { e.preventDefault(); goGame() }} className='login-btn'>Send me the Login Code</button>
                    {isError && <span style={{ color: 'red' }}>{errorMessage}</span>}
                </form>)
                : (<p>Loading...</p>)}
        </div>
    )
}   