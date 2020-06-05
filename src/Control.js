import React from "react";

class Control extends React.Component {
  render() {
    return <button className="control" onClick={this.props.onClick}>{this.props.isClockwise ? 'Clockwise' : 'Counter-clockwise'}</button>;
  }
}

export default Control;