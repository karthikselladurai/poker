import { useState } from 'react';
import './playerOptions.css'

const PlayerOption = () => {
    const max = 1000

    const [raiseValue, setRaiseValue] = useState(0);
    const [showRange, setShowRange] = useState(false)


    const callHandler = () => {

    }
    const raiseHandler = () => {
        setShowRange(true)

    }
    const raiseValueHandler = () => {
        setShowRange(false)
    }

    const handleChange = (event) => {
        console.log(event.target.value);
        setRaiseValue(event.target.value);
    };


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
                    <button>Fold</button>
                </div>}

        </div>
    )
}
export default PlayerOption;