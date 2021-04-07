import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from './Alert';
import FooterEscuro from './FooterEscuro';
import Loader from './Loader'
import { AuthContext } from '../apiHooks/useAuth';
import { AlertContext } from '../apiHooks/useAlert';

const Login = (props) => { 
  const auth = useContext(AuthContext);
  const alert = useContext(AlertContext);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  
  
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    if(props.location.state && props.location.state.alert) {
      alert.setAlert(props.location.state.alert);  
      alert.setShowAlertErro(false);
    } else {
      alert.zerarState();
    }
  // eslint-disable-next-line
}, []);

 const onSubmitLoginHandler = (event) => {
      event.preventDefault();
      auth.login(usuario, senha, 
        erro => {
          if(erro) {
            alert.setAlert("Usuário ou senha inválidos!");
            alert.setShowAlertErro(true);
          } 
        });
  }

 
    if(auth.isAuthenticated()) {
      return  <Redirect to="/busca" />
    }
    return (
      <div>
      <section className="container">
        <form onSubmit={onSubmitLoginHandler} className={`form grid-9 ${auth.error ? "form-alert" : ""}`}>
          <h1 className="title-form">Entrar</h1>
         { alert.alert ? <Alert message={alert.alert} error={alert.showAlertErro} />  : ""}
          <label htmlFor="usuario" className={`label-form ${auth.error ? "" : "label-alert"}`} >Usuário</label>
          <input type="text" id="usuario" className="txt-form" required  name="usuario"
              onChange={e => setUsuario(e.target.value)} />
          <label htmlFor="senha" className="label-form">Senha</label>
          <input type="password" id="senha" className="txt-form" required  name="senha"
              onChange={e => setSenha(e.target.value)}
                autoComplete = "senha atual" />
          <button type="submit" className="btn-form" disabled={auth.processing}>
                {auth.processing ? 
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

export default Login;