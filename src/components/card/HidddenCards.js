import React from 'react';
import './card.css' 

const HiddenCard = (props) => {
  return(
    <div 
      key={`${suit} ${cardFace}`} 
      className='playing-card'
      style={{animationDelay: `${(applyFoldedClassname) ?  0 : animationDelay}ms`}}>
    </div>
  )
}

export default HiddenCard;