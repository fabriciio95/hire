import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';
import FooterEscuro from './FooterEscuro';
import AuthService from '../api/AuthService';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
     alert: "",
     showAlertCadastro : false
    }
  }
  
  componentDidMount(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if(this.props.location.state && this.props.location.state.alert) {
      this.setState({ alert : this.props.location.state.alert , showAlertVerde : true });
    } 
  }

  render() {
    if(AuthService.isAuthenticated()) {
      return ( <Redirect to="/busca" />)
    }
    return (
      <div>
      <section className="container">
        <form className={`form grid-9 ${this.state.alert ? "form-alert" : ""}`}>
          <h1 className="title-form">Entrar</h1>
         { this.state.alert ? <Alert message={this.state.alert} error={this.state.showAlertVerde
               ? false : true} /> : "" }
          <label htmlFor="usuario" className={`label-form ${this.state.alert ? "" : "label-alert"}`} >Usuário</label>
          <input type="text" id="usuario" className="txt-form" required />
          <label htmlFor="senha" className="label-form">Senha</label>
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