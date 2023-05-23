import React from "react"

import Card from "../cards/Cards";

const Player = (props) => {
    console.log("props", props);
    console.log("progdfgfdgfdgps>>>>>>>>", props.data.username);
    return (
        <div>
            <div>
                {props.data.cards.map((card,index) => {
                    return (
                        <Card  key={index} data={card}/>
                    )
                })}
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