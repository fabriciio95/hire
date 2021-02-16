import React, { Component } from 'react';

class Loader extends Component {
  render() {
    return (
      <div className={`${this.props.border ? "loader-border" : ""}`}>
        <div className="loader">

        </div>
      </div>
    );
  }
}

export default Loader;