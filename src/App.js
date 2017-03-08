import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
// import Board from './Board'

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

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "hvh",
      grid: 3
    }
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleGridChange = this.handleGridChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleModeChange(e) {
    this.setState({ mode: e.target.value });
  }
  handleGridChange(e) {
    this.setState({ grid: parseInt(e.target.value, 10) });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.newGame();
    alert("You have selected mode: " + this.state.mode + "and grid size: " + this.state.grid);
  }
  render() {
    return (
    <div className="form-wrapper">
      <form onSubmit={this.handleSubmit} >
        <label>Human vs Human
        <input type="radio" name="mode" value="hvh" id="hvh"
                onChange={this.handleModeChange}
                checked={this.state.mode === "hvh"} />
        </label>
        <label>Human vs CPU</label>
        <input type="radio" name="mode" value="hvc" id="hvc"
                onChange={this.handleModeChange}
                checked={this.state.mode === "hvc"} />
        <label>CPU vs CPU</label>
        <input type="radio" name="mode" value="cvc" id="cvc"
                onChange={this.handleModeChange}
                checked={this.state.mode === "cvc"} />

        <label>3x3</label>
        <input type="radio" name="grid-size" value="3" id="g3"
                onChange={this.handleGridChange}
                checked={this.state.grid === 3} />
        <label>4x4</label>
        <input type="radio" name="grid-size" value="4" id="g4"
                onChange={this.handleGridChange}
                checked={this.state.grid === 4} />
        <label>5x5</label>
        <input type="radio" name="grid-size" value="5" id="g5"
                onChange={this.handleGridChange}
                checked={this.state.grid === 5} />

        <input type="submit" value="New Game" />
      </form>
    </div>)
  }
}

function checkWinner(boxes, r, c) {
  const val = boxes[r][c];
  const checkVal = (b) => (b === val);
  // check row
  if (boxes[r].every(checkVal))
    return val;
  // check column
  if (boxes.map(row => row[c]).every(checkVal))
    return val;
  // check diagonal
  if (r === c && boxes.map((row, i) => row[i]).every(checkVal))
    return val;

  return null;
}

class Game extends Component {
  constructor(props) {
    super(props);
    const dim = 3;
    this.state = {
      boxes: Array(dim).fill(Array(dim).fill(null)),
      isXTurn: true,
      hasWinner: null
    };
    //this.handleOnClick.bind(this)
  }
  handleOnClick(r, c) {
    let boxes = this.state.boxes.slice();

    if (boxes[r][c] || this.state.hasWinner) return;

    let row = boxes[r].slice();
    row[c] = this.state.isXTurn ? 'X' : 'O';
    boxes[r] = row;

    this.setState({
      boxes: boxes,
      isXTurn: !this.state.isXTurn,
      hasWinner: checkWinner(boxes, r, c)
    });
  }
  handleNewGame() {
    // TODO implement this
  }
  render() {
    return (
      <div>
        <Menu newGame={() => this.handleNewGame()}/>
        <Board boxes={this.state.boxes} onClick={(r,c) => this.handleOnClick(r,c)}/>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
