import React from 'react';
import logo from './logo.svg';
import './App.css';
import cardBack from './img/rouleur_back.png';
import cardFront from './img/black_r_4.png';
import ReactCardFlip from 'react-card-flip';
import CardFlip from './Components/CardFlip';
import Deck from './Components/Deck';
import ButtonDeck from './Components/ButtonDeck';
import BasicTransition from './Components/BasicTransition';
import Spring from './Components/Spring';

function App() {

  return (
    <div>
      {/* <CardFlip />
      <ButtonDeck /> */}
      {/* <BasicSpring></BasicSpring> */}
      <Spring></Spring>
    </div>
  );
}

export default App;
