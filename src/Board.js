import React from "react";
import Square from "./Square";
import Control from "./Control";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: [10, 5, 5, 5, 5, 5, 10, 5, 5, 5, 5, 5],
      isClockwise: true,
      cursor: 0,
      countHold: 0,
      countA: 0,
      countB: 0,
      nextIsA: true,
    };
  }

  setCursor(i) {
    this.setState({
      cursor: i,
    });
  }

  moveCursor() {
    const i = this.state.cursor;
    if (this.state.isClockwise && i !== 11) {
      this.setCursor(i + 1);
    } else if (!this.state.isClockwise && i !== 0) {
      this.setCursor(i - 1);
    } else if (this.state.isClockwise && i === 11) {
      this.setCursor(0);
    } else if (!this.state.isClockwise && i === 0) {
      this.setCursor(11);
    }
  }

  dropOne(time) {
    setTimeout(() => {
      const c = this.state.squares.slice();
      const count = this.state.countHold;
      c[this.state.cursor]++;
      this.setState({
        squares: c,
        countHold: count - 1,
      });
      this.moveCursor();
      console.log(
        "Hold: " + this.state.countHold + " Loc: " + this.state.cursor
      );
      if (this.state.countHold > 0) {
        this.dropOne(time);
      } else if (this.state.countHold === 0 && !this.isStopped()) {
        console.log("Pickall");
        this.pickAll(time);
      } else if (this.state.countHold === 0 && this.isStopped()){
            while (this.isTakable()) {
              console.log('Test: ' + this.state.cursor)
              this.takeAll();
              this.moveCursor();
            }
            this.togglePlayer();  
      }
    }, time);
  }

  takeAll() {
    const c = this.state.squares.slice();
    const index = this.state.cursor;
    const cnt = c[index];
    c[index] = 0;
    if (this.state.nextIsA) {
      this.setState({
        squares: c,
        countB: this.state.countB+cnt,
      });
    } else {
      this.setState({
        countA: this.state.countA+cnt,
        squares: c,
      });
    }
  }

  pickAll(time) {
    setTimeout(() => {
      const c = this.state.squares.slice();
      const count = c[this.state.cursor];
      c[this.state.cursor] = 0;
      this.setState({
        squares: c,
        countHold: count,
      });
      this.moveCursor();
      this.dropOne(time);
    }, time);
  }

  isStopped() {
    const c = this.state.squares.slice();
    const i = this.state.cursor;
    if (this.state.isClockwise && (c[i] === 0 || (i === 11 && c[0] === 0))) {
      return true;
    } else if (
      !this.state.isClockwise &&
      (c[i] == 0 || (i == 0 && c[11] == 0))
    ) {
      return true;
    } else {
      return false;
    }
  }

  isTakable() {
    const c = this.state.squares.slice();
    const i = this.state.cursor;
    if (
      (this.state.isClockwise && c[i] == 0  && ((i != 11 && c[i + 1] > 0) || (i == 11 && c[1] > 0))) ||
      (!this.state.isClockwise && c[i] == 0 && ((i != 0 && c[i - 1] > 0) || (i == 0 && c[10] > 0)))
    ){
      this.moveCursor();
      return true;
    }   
    return false;
  }

  moveValid(i) {
    const c = this.state.squares.slice();
    if (i !== 0 && i !== 6 && c[i] > 0) {
      return true;
    } else {
      return false;
    }
  }

  handleClick(i) {
    if (this.moveValid(i)) {
      this.setCursor(i);
      this.pickAll(500);
    }
  }

  togglePlayer(){
    this.setState({
      nextIsA : !this.state.nextIsA
    });
  }

  toggleDirection() {
    this.setState({
      isClockwise: !this.state.isClockwise,
    });
  }

  renderSquare(i, c) {
    return <Square index={i} s={c} onClick={() => this.handleClick(i)} />;
  }
  renderControl(d) {
    return <Control isClockwise={d} onClick={() => this.toggleDirection()} />;
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <table>
          <tr>
            <td rowSpan="2">{this.renderSquare(0, this.state.squares)}</td>
            <td>{this.renderSquare(1, this.state.squares)}</td>
            <td>{this.renderSquare(2, this.state.squares)}</td>
            <td>{this.renderSquare(3, this.state.squares)}</td>
            <td>{this.renderSquare(4, this.state.squares)}</td>
            <td>{this.renderSquare(5, this.state.squares)}</td>
            <td rowSpan="2">{this.renderSquare(6, this.state.squares)}</td>
          </tr>
          <tr>
            <td>{this.renderSquare(11, this.state.squares)}</td>
            <td>{this.renderSquare(10, this.state.squares)}</td>
            <td>{this.renderSquare(9, this.state.squares)}</td>
            <td>{this.renderSquare(8, this.state.squares)}</td>
            <td>{this.renderSquare(7, this.state.squares)}</td>
          </tr>
        </table>
        {this.renderControl(this.state.isClockwise)}
        <h3>A: {this.state.countA}</h3>
        <h3>B: {this.state.countB}</h3>
      </div>
    );
  }
}

export default Board;
