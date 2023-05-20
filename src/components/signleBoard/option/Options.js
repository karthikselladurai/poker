import Players from './Players/Players';
import './options.css'

const Options = ({ seatArray }) => {
    return (
        <div className='options'>
            <div className='players'>
                <Players seatArray={seatArray} />
            </div>
            <div className='game'>
                <span>Game</span>
            </div>
            <div className='preference'>
                <span>preference</span>
            </div>
            <div className='Video-audio'>
                <span>Video/Audio</span>
            </div>
            <div className='apply-changes'>
                <span>Apply Changes</span>
            </div>

        </div>
    )
}
export default Options;