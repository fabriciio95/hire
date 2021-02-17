import React, { Component } from 'react';
import { Link } from 'react-router-dom';



class HeaderItem extends Component {  

  render() {
    return (
      <li>
        <Link className="btn" to={this.props.item.href} 
              onClick={e => this.props.onClick ? this.props.onClick() : ""}>{this.props.item.name}</Link>
      </li>
    );
  }
}

export default HeaderItem;