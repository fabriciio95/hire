import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';
import FooterEscuro from './FooterEscuro';
import AuthService from '../api/AuthService';
import Loader from './Loader'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
     alert: "",
     showAlertErro : true,
     loading : false,
     loggedIn : false, 
     usuario : "",
     senha : ""
    }
    this.onSubmitLoginHandler = this.onSubmitLoginHandler.bind(this);
    this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
  }
  
  componentDidMount(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if(this.props.location.state && this.props.location.state.alert) {
      this.setState({ alert : this.props.location.state.alert , showAlertErro : false });
    } 
  }

  onInputChangeHandler(event) {
    var field = event.target.name;
    var value = event.target.value;
    this.setState({ [field] : value} );
  }

  onSubmitLoginHandler(event) {
      event.preventDefault();
      this.setState({ loading : true });
      AuthService.login(this.state.usuario, this.state.senha, 
        (success) => {
          if(success) {
            this.setState({ loggedIn : true, loading: false });
            this.props.onLoginSuccess();
          } else {
              this.setState({ alert : "Usuário ou senha inválidos",  showAlertErro : true,  loading : false });
          }
        });
  }

  render() {
    if(AuthService.isAuthenticated() || this.state.loggedIn) {
      return ( <Redirect to="/busca" />)
    }
    return (
      <div>
      <section className="container">
        <form onSubmit={this.onSubmitLoginHandler} className={`form grid-9 ${this.state.alert ? "form-alert" : ""}`}>
          <h1 className="title-form">Entrar</h1>
         { this.state.alert ? <Alert message={this.state.alert} error={this.state.showAlertErro} /> : "" }
          <label htmlFor="usuario" className={`label-form ${this.state.alert ? "" : "label-alert"}`} >Usuário</label>
          <input type="text" id="usuario" className="txt-form" required  name="usuario"
              onChange={e => this.onInputChangeHandler(e)} />
          <label htmlFor="senha" className="label-form">Senha</label>
          <input type="password" id="senha" className="txt-form" required  name="senha"
              onChange={e => this.onInputChangeHandler(e)}
                autoComplete = "senha atual" />
          <button type="submit" className="btn-form" disabled={this.state.loading}>
                {this.state.loading ? 
                <Loader /> : "Entrar"}
            </button>
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