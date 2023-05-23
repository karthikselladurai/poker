import React from 'react';
// import { 
//   renderUnicodeSuitSymbol 
// } from '../../utils/ui';

const Card = (props) => {

  return(
    <div>
      <span>{props.data.cardFace}</span>
      <span>{props.data.suit}</span>
    </div>
  )
}

export default Card;