import React, { Component } from 'react';
import FooterAzul from './FooterAzul';
import Alert from './Alert';
import Loader from './Loader'
import CrudService from '../api/crudService';
import { Redirect } from 'react-router-dom';

class Cadastro extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: "",
      loading : false, 
      redirect : false, 
      usuario : {
        usuario : "",
        senha : "",
        nome : "",
        endereco : "",
        email : "",
        descricao : "",
        valorHora : "",
        telefone : "",
        euQuero : "",
        fotoBase64 : ""
      }
     }
    this.onInputUsuarioChangeHandle = this.onInputUsuarioChangeHandle.bind(this);
    this.dadosPerfilHandler = this.dadosPerfilHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onInputFotoChangeHandle = this.onInputFotoChangeHandle.bind(this);
    this.onSetStateBase64 =  this.onSetStateBase64.bind(this);
    this.onSetError = this.onSetError.bind(this);
  }

  componentDidMount(){
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }

  onSubmitHandler(event){
    event.preventDefault();
    this.setState({ alert : "", loading : true });
    var euQuero = document.getElementById("select").value;
    if( euQuero === "Contratar") {
        CrudService.cadastrarUsuario(this.state.usuario, 
          () => this.setState({loading: false, redirect : true}), 
          error => this.onSetError(error));
    } else {
      CrudService.cadastrarProfissional(this.state.usuario,
        () => this.setState({ loading : false, redirect : true}),
        error => this.onSetError(error));
    }
  }

  onSetError(error) {
    console.log(error);
    if(error.response) {
      if(error.response.data.campos) {
        var messageError = "";
       var campos = error.response.data.campos;
       for(var i = 0; i < campos.length; i++){
          messageError += campos[i].mensagem;
       }
       this.setState({ error : `Erro: ${messageError}`, loading : false});
      } else {
        this.setState({ error : `Erro: ${error.response.data.titulo}`, loading : false});
      }
    } else {
      this.setState({error : `Erro na requisão: ${error.message}`, loading : false})
    }
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }

  onInputUsuarioChangeHandle(event){
    var field = event.target.name;
    var value = event.target.value;
    this.setState(prevState => ({ usuario: {...prevState.usuario, [field] : value}}));
  }
  
  onInputFotoChangeHandle() {
    var file = document.getElementById("foto").files;
    if(file.length > 0) {
      var fileSelect = file[0];
      var fileReader = new FileReader();

      fileReader.onload = function(fileLoadEvent) {
          var srcData = fileLoadEvent.target.result;
          changeFotoBase64(srcData);
      }
      fileReader.readAsDataURL(fileSelect);
    }

    var changeFotoBase64 = (fileBase64) => {
      this.onSetStateBase64(fileBase64);
    }
  }

  onSetStateBase64(fileBase64) {
    var field = "fotoBase64";
     this.setState(prevState => ({ usuario: {...prevState.usuario, [field] : fileBase64.split(",")[1]}}));
  }

  dadosPerfilHandler(event) {
    var field = event.target.name;
    const value = event.target.value;
    this.setState(prevState => ({ usuario: {...prevState.usuario, [field] : value }}));
    if(value === "SER_CONTRATADO" || value === "AMBOS") {
      document.getElementById("dados-perfil").style.display = "block";
      document.getElementById("endereco").required = true;
      document.getElementById("telefone").required = true;
      document.getElementById("email").required = true;
      document.getElementById("valor").required = true;
      document.getElementById("descricao").required = true;
    } else {
      document.getElementById("dados-perfil").style.display = "none";
      document.getElementById("endereco").required = false;
      document.getElementById("telefone").required = false;
      document.getElementById("email").required = false;
      document.getElementById("valor").required = false;
      document.getElementById("descricao").required = false;
    }
  }

  render() {
    if(this.state.redirect) {
     return (
        <Redirect to={
            {pathname: "/login", state : {alert: "Cadastro realizado com sucesso!"}
        }}/>
        );
    }
    return (
      <div>
        <section className="introducao-cadastro">
          <div className="container">
              <h1 className="introducao-title introducao-title-cadastro">Junte-se a nós</h1>
              <h2 className="introducao-sub-title-cadastro">Crie um perfil gratuito para desbloquear oportunidades para você ou para aqueles que mais precisam.</h2>
          </div>
        </section>
        <section className="container">
          <form className={`form form-cadastro grid-9 ${this.state.error ? "form-alert-cadastro" : ""}`} id="form-cadastro"   onSubmit={this.onSubmitHandler}>
            <h1 className="title-form">Cadastro</h1>
            { this.state.error ? <Alert message={this.state.error} error={true} /> : "" }
            <label htmlFor="nome" className={`label-form ${this.state.error ? "" : "label-alert"}`} >Nome</label>
            <input type="text" id="nome" className="txt-form" required 
                onChange={event => this.onInputUsuarioChangeHandle(event)} name="nome"/>
            <label htmlFor="usuario" className="label-form" >Usuário</label>
            <input type="text" id="usuario" className="txt-form" required 
                onChange={event => this.onInputUsuarioChangeHandle(event)}  name="usuario"/>
            <label htmlFor="senha" className="label-form">Senha</label>
            <input type="password" id="senha" className="txt-form" required  autoComplete = "senha atual"
                onChange={event => this.onInputUsuarioChangeHandle(event)} name="senha"/>
            <label htmlFor="foto" className="label-form">Foto: </label>
            <input type="file" id="foto" className="input-file-form"
                  onChange={event => this.onInputFotoChangeHandle(event)} required />
            <label htmlFor="select" className="label-form">Eu vou: </label>
            <select id="select" name="euQuero" className="select-form"
             onChange={e => this.dadosPerfilHandler(e)}>
              <option value="Contratar">Contratar</option>
              <option value="SER_CONTRATADO">Ser Contratado</option>
              <option value="AMBOS">Ambos</option>
            </select>
            <div className="form-dados-perfil" id="dados-perfil">
              <label htmlFor="endereco" className="label-form" >Endereço</label>
              <input type="text" id="endereco" className="txt-form"  
                  onChange={event => this.onInputUsuarioChangeHandle(event)} name="endereco"/>
              <label htmlFor="telefone" className="label-form" >Telefone</label>
              <input type="text" id="telefone" className="txt-form"  
                   onChange={event => this.onInputUsuarioChangeHandle(event)} name="telefone"/>
              <label htmlFor="email" className="label-form" >E-mail</label>
              <input type="email" id="email" className="txt-form"  
                   onChange={event => this.onInputUsuarioChangeHandle(event)} name="email"/>
              <label htmlFor="valor" className="label-form" >Valor/Hora</label>
              <input type="text" id="valor" className="txt-form"  
                     onChange={event => this.onInputUsuarioChangeHandle(event)} name="valorHora" />
              <label htmlFor="descricao" className="label-form" >Descrição</label>
              <textarea id="descricao" className="txt-area-form"
               placeholder="Ex: faxina, manicure, fotografia, etc..."  
               onChange={event => this.onInputUsuarioChangeHandle(event)} name="descricao"></textarea>
            </div>
            <button type="submit" className="btn-form btn-form-cadastro" disabled={this.state.loading}>
                {this.state.loading ? 
                <Loader /> : "Salvar"}
            </button>
          </form>
        </section>
        <FooterAzul isWithButton={false}/>
      </div>
    );
  }
}

export default Cadastro;