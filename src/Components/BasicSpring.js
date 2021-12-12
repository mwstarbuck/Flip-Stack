import React, { useState } from 'react';
import { useTransition, animated } from 'react-spring';


const BasicSpring = () => {

  // const [isVisible, setIsVisible] = useState(false);
  const [items, setItems] = useState([]);
  const transition = useTransition(/*isVisible*/ items, {
    from: { x: -100, y: 800, opacity: 0 }, //item starting position
    enter: item => async (next) => {
      await next({ y: item.y, opacity: 1, delay: item.delay });
      await next({ x: 0 });
    }, // item ending position
    leave: { x: 100, y: 800, opacity: 0 }, //item ending position when leaving
  });
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <button onClick={() => {
        // setIsVisible(v => !v);
        setItems(v => v.length ? [] : [
          { y: -100, delay: 200 },
          { y: -50, delay: 400 },
          { y: 0, delay: 600 }
        ]);
      }}>{/*isVisible*/ items.length ? 'un-mount' : 'mount'}</button>
      <div className='container'>
        {
          transition((style, item) =>
            item ? <animated.div style={style} className='item' /> : null
          )
        }
      </div>
    </div>
  )
}
export default BasicSpring;