import './App.css'
import React, { useState, useEffect } from 'react'
import SingleCard from './components/SingleCard';
const cardImages = [
  { "src" : "/img/helmet-1.png", matched: false },
  { "src" : "/img/potion-1.png", matched: false },
  { "src" : "/img/ring-1.png", matched: false },
  { "src" : "/img/scroll-1.png", matched: false },
  { "src" : "/img/shield-1.png", matched: false },
  { "src" : "/img/sword-1.png", matched: false }
]

/*
 when math.random()-0.5 is negative, they remain in the same order
 when math.random()-0.5 is positive, they swap places

*/


function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const suffleCards = () => {
    const suffledCards = [ ...cardImages, ...cardImages ] // duplicate the array to get 12 cards 2 of each
      .sort(() => Math.random() - 0.5) // suffle the cards
      .map((card) => ({ ...card, id: Math.random() })) // add an id to each card
      
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(suffledCards);
    setTurns(0);
  }

  // handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // compare 2 selected cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true);
      if(choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
      }
      else {
        console.log("not equal");
      }
      setTimeout(() => resetTurn(), 1000);
    }   
  }, [choiceOne, choiceTwo]);
  
  console.log( cards );

  // reset the choices and increment the turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  // start the game automatically
  useEffect(() => {
    suffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCards} >New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard 
            key={card.id} 
            card={card} 
            handleChoice={handleChoice}
            flipped= {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <p>Turns : {turns} </p>
    </div>
  );
}

export default App