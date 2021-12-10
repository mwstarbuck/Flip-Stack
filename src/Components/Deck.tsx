import React from 'react';
import { useSprings, animated, to as interpolate } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { makeStyles } from '@material-ui/core/styles';
import cardBack from '../img/rouleur_back.png';

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

function Deck() {
  const classes = useStyles();
  const [gone] = React.useState(() => new Set()) // The set flags all the cards that are flicked out
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above
  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2 // If you flick hard enough it should trigger the card to fly out
    const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
    if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
    api.start(i => {
      if (index !== i) return // We're only interested in changing spring-data for the current spring
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })
  // Now we're just mapping the animated values to our view, that's it. Btw, this component only renders once. :-)
  return (
    <>
      <div className={classes.container}>
        {props.map(({ x, y, rot, scale }, i) => (
          <animated.div className={classes.deck} key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div className={classes.card}
              {...bind(i)}
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
    </>
  )
}

export default Deck;
/* export default function App() {
  return (
    <div className={styles.container}>
      <Deck />
    </div>
  )
}
 */