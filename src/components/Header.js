import React from 'react';
import { useHeaderItems } from '../apiHooks/useHeaderItems';
import HeaderItem from './HeaderItem';


const Header = () =>  {

  const headerItems = useHeaderItems();

    return (
      <header className="header">
          <div className="container">
            <a className="grid-4 logo" href="/">Hire</a>
            <nav className="header_menu grid-12">
              <ul>
                    {headerItems.items.map(item => <HeaderItem item={item} key={item.name} />)}
               </ul>
            </nav>
        </div>
      </header>
    );
  }

export default Header;