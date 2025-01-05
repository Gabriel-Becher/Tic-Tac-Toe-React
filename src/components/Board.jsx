import "./Board.css";
import Slot from "./Slot.jsx";

import { useState } from "react";

export default function Board() {
  const [slots, setSlots] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [winner, setWinner] = useState(null);
  const [draw, setDraw] = useState(null);

  const checkWinner = (slots, player) => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    return winConditions.some((condition) => {
      return condition.every((index) => slots[index] === player);
    });
  };

  const checkDraw = (slots) => {
    setDraw(slots.every((slot) => slot));
  };

  const handleClick = (i) => {
    if (slots[i] || winner) return;

    const newSlots = [...slots];
    newSlots[i] = player;
    setSlots(newSlots);

    if (checkWinner(newSlots, player)) {
      setWinner(player);
      return;
    }
    if (checkDraw(newSlots)) {
      setWinner("Draw");
    } else {
      setPlayer(player === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setSlots(Array(9).fill(null));
    setPlayer("X");
    setWinner(null);
  };

  return (
    <>
      <h1 className="score">
        {draw
          ? "It's a Draw"
          : winner
          ? `Player ${winner} wins!`
          : `Player ${player}'s turn`}
      </h1>
      <div className="board">
        {slots.map((slot, index) => {
          return (
            <Slot
              value={slot}
              key={index}
              onSlotClick={() => handleClick(index)}
            />
          );
        })}
      </div>
      <button onClick={handleReset}>Reset</button>
    </>
  );
}
