import Players from './Players/Players';

const Options = ({seatArray})=>{
    return(
        <div>
            <div>
                <Players seatArray={seatArray} />
            </div>
            
        </div>
    )
}
export default Options;