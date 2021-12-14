import React, { useEffect, useState } from 'react';
import { useSpring, useSprings, animated, to as interpolate } from 'react-spring';

// const from = (i) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// const to = (i) => ({
// x: 0,
// y: i * -1, // stack effect -- the larger the number the more space between cards in the stack
// scale: 1,
// rot: -10 + Math.random() * 5, // controls how much cards in deck are out of allignment
// delay: i * 100,
// })

const cards = [
  {
    type: "Rouleur",
    movement: 3,
  },
  {
    type: "Rouleur",
    movement: 5
  },
  {
    type: "Rouleur",
    movement: 4
  },
  {
    type: "Rouleur",
    movement: 6
  },
  {
    type: "Rouleur",
    movement: 7
  }
];

const Spring = () => {
  const [showCard, setShowCard] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [discard, setDiscard] = useState(false);
  const [mouseOn, setMouseOn] = React.useState(false);
  const { opacity, transform, marginTop } = useSpring({
    opacity: flipped ? 1 : 0, //showCard ? 1 : 0,
    marginTop: showCard ? -100 : -1000,
    transform: `perspective(600px) rotateY(${flipped ? 180 : 0}deg) scale(${mouseOn ? 1.3 : 1.0})`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  const handleClick = () => {
    setShowCard(c => !c);
  }
  const handleFlip = () => {
    setFlipped(f => !f);
    setDiscard(d => !d);
  }
  const handleDiscard = () => {
    setShowCard(c => !c);
    setFlipped(f => !f);
    setDiscard(d => !d);
  }
  return (
    <div>
      <div className='container'>
        <animated.div className={'c card'}
          style={{ opacity: opacity.to(o => 1 - o), transform, marginTop }}
          onMouseOver={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}
        >
          WUZZZZZZZZZUP!
        </animated.div>
        <animated.div className={'c card'}
          style={{ marginTop, opacity, transform, rotateY: '180deg' }}
          onMouseOver={() => setMouseOn(true)}
          onMouseLeave={() => setMouseOn(false)}>
          FOOL!!!!!
        </animated.div>
      </div >
      <button onClick={(showCard) ? discard ? handleDiscard : handleFlip : handleClick}>{showCard ? discard ? "Discard Card" : "Reveal Card" : "Draw Card"}</button>

    </div>
  )
}

export default Spring;