import React from 'react';

class Menu extends React.Component {
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
    this.props.newGame(this.state.mode, this.state.grid);
    // alert("You have selected mode: " + this.state.mode + " and grid size: " + this.state.grid);
  }
  render() {
    return (
    <div className="form-wrapper">
      <form onSubmit={this.handleSubmit} >
        <div className="radio">
          <label>
            <input type="radio" name="mode" value="hvh" id="hvh"
                    onChange={this.handleModeChange}
                    checked={this.state.mode === "hvh"} />
            Human vs Human
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="mode" value="hvc" id="hvc"
                    onChange={this.handleModeChange}
                    checked={this.state.mode === "hvc"} />
            Human vs CPU
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="mode" value="cvc" id="cvc"
                    onChange={this.handleModeChange}
                    checked={this.state.mode === "cvc"} />
            CPU vs CPU
          </label>
        </div>

        <div className="radio">
          <label>
            <input type="radio" name="grid-size" value="3" id="g3"
                    onChange={this.handleGridChange}
                    checked={this.state.grid === 3} />
            3x3
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="grid-size" value="4" id="g4"
                    onChange={this.handleGridChange}
                    checked={this.state.grid === 4} />
            4x4
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" name="grid-size" value="5" id="g5"
                    onChange={this.handleGridChange}
                    checked={this.state.grid === 5} />
            5x5
          </label>
        </div>

        <input type="submit" value="New Game" />
      </form>
    </div>)
  }
}

export default Menu;
