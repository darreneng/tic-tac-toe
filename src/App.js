import React from 'react';
import './css/App.css';
import Menu from './Menu'
import Board from './Board'
import GameStatus from './GameStatus'


class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initialState("hvh", 3)
  }
  initialState(mode, grid) {
    return {
      boxes: Array(grid).fill(Array(grid).fill(null)),
      turnCount: 0,
      hasWinner: null,
      mode: mode
    };
  }
  handleOnClick(r, c) {
    if (this.state.boxes[r][c] || this.state.hasWinner)
      return;

    this.nextTurn(r, c);
  }
  nextTurn(r, c) {
    let boxes = this.state.boxes.slice();
    let row = boxes[r].slice();
    row[c] = this.state.turnCount % 2 ? 'O' : 'X'
    boxes[r] = row;
    this.setState({
      boxes: boxes,
      hasWinner: this.checkWinner(boxes, r, c),
      turnCount: this.state.turnCount + 1
    });
  }
  cpuMove() {
    const length = this.state.boxes.length;
    const cpuAgent = () => {
      while (true) {
        const r = Math.floor(Math.random() * length);
        const c = Math.floor(Math.random() * length);
        if (!this.state.boxes[r][c])
          return [r,c]
      }
    }
    const next = cpuAgent()
    setTimeout(() => this.nextTurn(next[0], next[1]), 1000)
  }
  componentDidUpdate() {
    // make CPU move if necessary
    const turnCount = this.state.turnCount;
    const maxc = this.state.boxes.length * this.state.boxes.length;
    const mode = this.state.mode;
    if (!this.state.hasWinner && turnCount < maxc &&
        (mode === "cvc" || (mode === "hvc" && turnCount % 2))) {
      this.cpuMove();
    }
  }
  checkWinner(boxes, r, c) {
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
    // check other diagonal
    const li = boxes.length - 1
    if (r + c === li && boxes.map((row, i) => row[li - i]).every(checkVal))
      return val;

    return null;
  }
  handleNewGame(mode, grid) {
    this.setState(this.initialState(mode, grid));
  }
  render() {
    return (
      <div className="game container">
        <Menu newGame={(m,g) => this.handleNewGame(m,g)}/>
        <Board boxes={this.state.boxes} onClick={(r,c) => this.handleOnClick(r,c)}/>
        <GameStatus isOTurn={this.state.turnCount % 2} mode={this.state.mode}
                    hasWinner={this.state.hasWinner} />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic Tac Toe</h2>
        </div>
        <Game />
      </div>
    );
  }
}

export default App;
