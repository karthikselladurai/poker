import { useState } from 'react';
import { useSelector} from 'react-redux'
import './playerOptions.css'
import socket from '../../service/socket';
import { Socket } from 'socket.io-client';

const PlayerOption = (props) => {
    const {setShowOption} = props
    const roomId = useSelector((state) => state.poker.roomId)
    const userId = useSelector((state) => state.auth.userId) 
    console.log('roomId ',roomId);
    const max = 1000

    const [raiseValue, setRaiseValue] = useState(0);
    const [showRange, setShowRange] = useState(false)


    const callHandler = () => {
        console.log('roomId ',roomId);
        let data = {
            roomId:roomId,
            userId:userId,
            action :'Call'
        }
        socket.emit('game/playReceive',data)
        setShowOption(false)

    }
    const raiseHandler = () => {
        setShowRange(true)
        let data = {
            roomId:roomId,
            userId:userId,
            action :'Raise'
        }
        socket.emit('game/playReceive',data)
        setShowOption(false)

    }
    const raiseValueHandler = () => {
        setShowRange(false)
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setRaiseValue(event.target.value);
    };
    const foldHandler = ()=>{
        let data = {
            roomId:roomId,
            userId:userId,
            action :'Fold'
        }
        socket.emit('game/playReceive',data)
        setShowOption(false)
    }


    return (
        <div className='player-opt'>
            {!showRange &&
                <div className='call-btn'>
                    <button onClick={callHandler}>Call</button>
                </div>}
            <div className='raise-ctn'>
                <div>
                    <button onClick={showRange ? raiseValueHandler : raiseHandler}>Raise</button>
                </div>
                {showRange && <div>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={raiseValue}
                        onChange={handleChange}
                    />
                </div>}

            </div>
            {!showRange &&
                <div className='check-btn'>
                    <button>Check</button>
                </div>}

            {!showRange &&
                <div className='fold-btn'>
                    <button onClick={foldHandler}>Fold</button>
                </div>}

        </div>
    )
}
export default PlayerOption;