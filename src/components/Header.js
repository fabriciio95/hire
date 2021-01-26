import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import HeaderItem from './HeaderItem';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Entre", href: "/" }
      ], 
      itemsLogado: [
        { name: "Buscar", href: "/form/2" },
        { name: "Minha Conta", href: "/form" },
        { name: "Sair", href: "/" }
      ]
    }
  }

  render() {
    return (
      <header className="header">
          <div className="container">
            <a className="grid-4 logo" href="/">Hire</a>
            <nav className="header_menu grid-12">
              <ul>
                  {AuthService.isAuthenticated() ?
                   this.state.itemsLogado.map(item => <HeaderItem item={item} key={item.name} />) : 
                   this.state.items.map(item => <HeaderItem item={item} key={item.name} /> )}
              </ul>
            </nav>
        </div>
      </header>
    );
  }
}

export default Header;