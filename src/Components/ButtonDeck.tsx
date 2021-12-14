import React, { useState } from 'react';
import { useSprings, animated, to as interpolate, useTransition } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { makeStyles } from '@material-ui/core/styles';
import cardBack from '../img/rouleur_back.png';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 100 + 'px',
    background: 'lightblue',
    display: 'flex',
    alignItems: 'center',
    height: 100 + '%',
    justifyContent: 'center'
  },
  deck: {
    position: 'absolute',
    width: 300 + 'px',
    height: 200 + 'px',
    willChange: 'transform',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none'
  },
  card: {
    backgroundColor: 'white',
    backgroundSize: 'auto ' + 85 + '%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: 45 + 'vh',
    maxWidth: 150 + 'px',
    height: 85 + 'vh',
    maxHeight: 285 + 'px',
    willChange: 'transform',
    borderRadius: 10 + 'px',
    boxShadow: '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)'
  }

}))


// const styles = require('../styles.css');

const cards = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16
]

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -1, // stack effect -- the larger the number the more space between cards in the stack
  scale: 1,
  rot: -10 + Math.random() * 5, // controls how much cards in deck are out of allignment
  delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function ButtonDeck() {
  const classes = useStyles();
  const [gone] = React.useState(() => new Set()) // The set flags all the cards that are flicked out
  const [remove, setRemove] = useState(false);
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  const transition = useTransition(props, {
    from: { x: props[props.length - 1].x },
    enter: { x: props[props.length - 1].x },
    leave: { x: 800 }
  });
  const handleClick = () => {
    setRemove(r => !r);
  }

  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      <div className={classes.container}>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div className={classes.deck} key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div className={classes.card}
              // {...bind(i)}
              style={{
                transform: interpolate([rot, scale], trans),
                // backgroundImage: `url(${cards[i]})`,
                backgroundImage: 'url(/images/rouleur_back.png)',
              }}
            >
            </animated.div>
          </animated.div>
        ))}
      </div>
      <button onClick={handleClick}>Push</button>
    </>
  )
}

export default ButtonDeck;
/* export default function App() {
  return (
    <div className={styles.container}>
      <Deck />
    </div>
  )
}
 */