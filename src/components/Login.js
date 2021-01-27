import React, { Component } from 'react';
import FooterEscuro from './FooterEscuro';

class Login extends Component {
  render() {
    return (
      <div>
      <section className="container">
        <form className="form grid-9">
          <h1 className="title-form">Entrar</h1>
          <label for="usuario" className="label-form" >Usuário</label>
          <input type="text" id="usuario" className="txt-form" required />
          <label for="senha" className="label-form">Senha</label>
          <input type="password" id="senha" className="txt-form" required />
          <input type="submit" value="Entrar" className="btn-form" />
          <p className="texto-form">
          Ainda não possui uma conta? <a href="/" className="link-form">Clique aqui</a>
          </p>
        </form>
      </section>
      <FooterEscuro />
      </div>
    );
  }
}

export default Login;