import React, { useState } from 'react'

const App = () => {

  const [cards, setCards] = useState([
    { id: 1, name: "Aman", count: 0 },
    { id: 2, name: "Aryan", count: 0 }
  ]);

  const handleLike = (id) => {
    setCards(cards.map((card) =>
      card.id === id ? { ...card, count: card.count + 1 } : card
    ))
  }

  const handleDislike = (id) => {
    setCards(cards.map((card) => 
      card.id === id ? { ...card, count: card.count - 1 } : card
    ))
  }

  return (
    <>
      <div className='boxes'>
        {
          cards.map((card) => (
            <div className='box' key={card.id}>
              {card.name}
              <br />
              <button onClick={() => handleLike(card.id)}>Like</button>
              <button onClick={() => handleDislike(card.id)}>DisLike</button>
              <h4>Count: {card.count}</h4>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default App;