import React from 'react';
import cardBack from '../img/rouleur_back.png';
import cardFront from '../img/black_r_4.png';
import ReactCardFlip from 'react-card-flip';

function CardFlip() {
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [mouseOn, setMouseOn] = React.useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className="App" style={{ backgroundColor: 'black', height: 'auto' }} >
      <ReactCardFlip isFlipped={isFlipped} flipDirection={"horizontal"} >
        <div
          onClick={handleFlip}
          onMouseOver={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}
        >
          <img style={{ width: 160 + 'px', margin: 50 + 'px', borderRadius: 12 + 'px' }} src={cardBack} />
        </div>
        <div
          onClick={handleFlip}
          onMouseOver={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}
        >
          <img style={{ width: 160 + 'px', margin: 50 + 'px', borderRadius: 12 + 'px', transition: 'all .3s ease-in-out', transform: `${mouseOn && isFlipped ? 'scale(1.3,1.3)' : 'scale(1.0,1.0)'}` }} src={cardFront} />
        </div>
      </ReactCardFlip>
    </div>
  );
}

export default CardFlip;