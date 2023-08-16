import { useState } from 'react';
import PlayersList from './playersList/PlayersList';
import './options.css'

const Options = (props) => {
    console.log("props", props);
    const { seatArray } = props
    console.log("option ", seatArray);
    const [players, setPlayers] = useState(true);
    const [game, setGame] = useState(false);
    const [preference, setPreference] = useState(false);
    const [VA, setVA] = useState(false);
    const [currentOption, setCurrentOPtion] = useState({setPlayers})


    const playersHandler = (data) => {
        currentOption.setPlayers(false)
        setCurrentOPtion({setPlayers:data.setOption})
        data.setOption(true)
        
    }
    return (
        <div className='options'>
            <div className='option-ctn'>
                <button onClick={()=>{playersHandler({setOption:setPlayers})}} >Players</button>
                <button onClick={()=>{playersHandler({setOption:setGame})}} >Game</button>
                <button onClick={()=>{playersHandler({setOption:setPreference})}} >preference</button>
                <button onClick={()=>{playersHandler({setOption:setVA})}} >Video/Audio</button>
                <button  >Apply Changes</button>
            </div>
            {players &&
                <PlayersList seatArray={seatArray} />
            }
            {game && <div className='option-view'>
                <span>Game</span>
            </div>}
            {preference && <div className='option-view'>
                <span>preference</span>
            </div>}
            {VA && <div className='option-view'>
                <span>Video/Audio</span>
            </div>}
        </div>
    )
}
export default Options;