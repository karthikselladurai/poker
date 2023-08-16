import React from "react"
import {useSelector} from 'react-redux'


import './player.css'

import Card from "../card/Card";

const Player = (props) => {
    const userId = useSelector((state) => state.auth.userId)
    console.log("props player >>>>> ", props);
    console.log("progdfgfdgfdgps>>>>>>>>", props.data.username);
    return (
        <div className={`player player-${props.index}`}>
            <div className="card">
                {props.data.cards ?(
                    props.data.cards.map((card,index) => {
                        return (
                            <Card  key={index} data={card}/>
                        )
                    })
                ):
                
                (null)}
            </div>
            <div>
                <span>{props.data.username}</span>
            </div>
            <div>
                <span>{'time..'}</span>
            </div>
        </div>
    )
}
export default Player