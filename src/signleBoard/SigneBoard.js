import './singleBoard.css';
import { useState, useEffect } from 'react';
import { ioCon } from '../service/io';

const SingleBoard = () => {
    console.log("yess");
    const [seatId, setSeatId] = useState(1)
    const [seatSelected, setSeatSelected] = useState(false);
    const [seatArray, setSeatArray] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    console.log(seatSelected);

    useEffect(() => {
        // ioCon();
        const index = seatArray.indexOf(seatId);
        if (index === -1) return seatArray;
        setSeatArray(seatArray.slice(index).concat(seatArray.slice(0, index)));
        // setSeatSelected(true)
        console.log(">>>>>>>>>>>>>>>>>>>",seatSelected);

    }, [seatSelected])
    const dummyData = {
        '1': 'k1',
        '2': 'k2',  
        '3': 'k3'
    }
    const seatSelectedHandler = (data) => {
        console.log("fdgfdgdgfdgd");
        setSeatId(data);
        setSeatSelected(true);
    }

    return (
        <div className="poker-table">
            {seatSelected ? seatArray.map(data => {
                return <div key={data}>{dummyData[data] ? (dummyData[data]+"- "+data ): "dummy-"+data}</div>
            }) : (seatArray.map(data => {
                return <button key={data} onClick={()=>seatSelectedHandler(data)}>{data}</button>
            }))}
            <h1>{seatSelected}</h1>
        </div>
    );
}

export default SingleBoard;
