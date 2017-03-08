import React from 'react';

const Box = (props) => (
  <button className="box" onClick={() => props.onClick()}>
    {props.value}
  </button>
)

const Board = (props) => {
  const boxes = props.boxes;
  const boxRows = boxes.map((row, r) => (
    <div className="board-row" key={r}>
      {row.map((box, c) => (
        <Box value={boxes[r][c]} onClick={() => props.onClick(r,c)} key={c} />
      ))}
    </div>
  ));
  return <div className="board">{boxRows}</div>;
}

export default Board;
