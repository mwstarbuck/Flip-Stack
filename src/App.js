import React from 'react';
import logo from './logo.svg';
import './App.css';
import cardBack from './img/rouleur_back.png';
import cardFront from './img/black_r_4.png';
import ReactCardFlip from 'react-card-flip';
import CardFlip from './Components/CardFlip';
import Deck from './Components/Deck';
import ButtonDeck from './Components/ButtonDeck';

function App() {
  // const [isFlipped, setIsFlipped] = React.useState(false);
  // const [mouseOn, setMouseOn] = React.useState(false);

  // const handleFlip = () => {
  //   setIsFlipped(!isFlipped);
  // }

  return (
    <div>
      <CardFlip />
      <Deck />
    </div>
  );
}

export default App;
