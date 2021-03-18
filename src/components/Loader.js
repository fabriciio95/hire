import React from 'react';

const Loader = (props) => {
    return (
      <div className={`${props.border ? "loader-border" : ""}`}>
        <div className={`loader ${props.big ? "loader-big" : ""}`}>
        </div>
      </div>
    );
}

export default Loader;