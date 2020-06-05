import React from "react";

class Square extends React.Component {
  render() {
    return <button className="square" onClick={this.props.onClick}>{this.props.s[this.props.index]}</button>;
  }
}

export default Square;
