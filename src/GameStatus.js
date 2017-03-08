import React from 'react';

const GameStatus = (props) => {
  const modeToLabel = {
    "hvh": "Human vs Human",
    "hvc": "Human vs CPU",
    "cvc": "CPU vs CPU"
  }
  return (
    <div>
      <h2>{modeToLabel[props.mode]}</h2>
      <h4>{(props.isOTurn ? "O" : "X") + "'s turn"}</h4>
      <h3>{props.hasWinner ? props.hasWinner + " has won!" : ""}</h3>
    </div>
  );
}

export default GameStatus;
