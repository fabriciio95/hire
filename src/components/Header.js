import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import HeaderItem from './HeaderItem';


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { name: "Entre", href: "/login" }
      ], 
      itemsLogado: [
        { name: "Buscar", href: "/busca" },
        { name: "Minha Conta", href: "/cadastro" }
      ],
    }
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  onLogoutHandler() {
    AuthService.logout();
    this.props.onLinkClick();
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
                   this.state.items.map(item => <HeaderItem item={item} key={item.name} />)}
                   {AuthService.isAuthenticated() ? 
                    <HeaderItem item={{name : "Sair", href: "#"}} onClick={this.onLogoutHandler}/> : ""};
              </ul>
            </nav>
        </div>
      </header>
    );
  }
}

export default Header;