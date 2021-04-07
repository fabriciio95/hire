import React from 'react';
import { Link } from 'react-router-dom';



const HeaderItem = ({ item }) => {  
    return (
      <li>
        <Link className="btn" to={item.href} 
              onClick={() => item.onClick ? item.onClick() : ""}>{item.name}</Link>
      </li>
    );
}

export default HeaderItem;