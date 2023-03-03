import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"

function App() {

  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function generateNewDice() {
    return {
      value: Math.ceil(Math.random() * 6 ), 
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for(var i = 0; i < 10; i++) {
      newDice.push(generateNewDice())
    } 
    return newDice;
  }

  

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die =>
      {
        return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
      }))
  }

  function RollDice() {
    if(tenzies) {
      setDice(allNewDice())
      setTenzies(false)
    }
    else {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateNewDice()
      }))
    }
  }

  const diceElement = dice.map(die => <Die key={die.id}  value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it as its current value between rolls</p>
      <div className="dice--container">
        {diceElement}
      </div>
      <button onClick={RollDice} className="roll-btn">
        {tenzies ? "New game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
