import { useState } from 'react';
import Players from './Players/Players';
import './options.css'

const Options = (props) => {
    console.log("props", props);
    const { seatArray } = props
    console.log("option ", seatArray);
    const [players, setPlayers] = useState(true);
    const [game, setGame] = useState(false);
    const [preference, setPreference] = useState(false);
    const [VA, setVA] = useState(false);

    const playersHandler = () => {

    }
    return (
        <div className='options'>
            <div className='option-ctn'>
                <button onClick={playersHandler}>Players</button>
                <button>Game</button>
                <button>preference</button>
                <button>Video/Audio</button>
                <button>Apply Changes</button>
            </div>
            {players &&
                <Players seatArray={seatArray} />
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