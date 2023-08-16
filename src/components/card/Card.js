import React from 'react';
import './card.css'

import { renderUnicodeSuitSymbol } from '../../utils/cards'

const Card = (props) => {

  return (
    <div className={`playing-card ${props.data.folded ? 'folded' : ''}`}>
      {!props.data.folded ?(
        <>
        <span className='card-face'>{props.data.cardFace}</span>
        <span style={{ color: `${(props.data.suit === 'Diamond' || props.data.suit === 'Heart') ? 'red' : 'black'}` }}>
          {`${renderUnicodeSuitSymbol(props.data.suit)}`}
        </span>
      </>
      ):(
        null  
      )
        
      }
    </div>
  )
}

export default Card;