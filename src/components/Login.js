import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Alert from './Alert';
import FooterEscuro from './FooterEscuro';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
     error: { message: "Usuário ou senha inválidos! Por favor verifique o que digitou nos campos usuários e senhas e tente novamente! Desde já muito obrigado!" }
    }
  }
  

  render() {
    return (
      <div>
      <section className="container">
        <form className={`form grid-9 ${this.state.error.message ? "form-alert" : ""}`}>
          <h1 className="title-form">Entrar</h1>
         { this.state.error.message ? <Alert message={this.state.error.message} error={true} /> : "" }
          <label for="usuario" className={`label-form ${this.state.error.message ? "" : "label-alert"}`} >Usuário</label>
          <input type="text" id="usuario" className="txt-form" required />
          <label for="senha" className="label-form">Senha</label>
          <input type="password" id="senha" className="txt-form" required />
          <input type="submit" value="Entrar" className="btn-form" />
          <p className="texto-form">
          Ainda não possui uma conta? <Link to="/cadastro" className="link-form">Clique aqui</Link>
          </p>
        </form>
      </section>
      <FooterEscuro />
      </div>
    );
  }
}

export default Login;