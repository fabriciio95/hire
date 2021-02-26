import React, { Component } from 'react';
import FooterAzul from './FooterAzul';
import AuthService from "../api/AuthService"
import Alert from './Alert';
import Loader from './Loader'
import CrudService from '../api/crudService';
import { Redirect } from 'react-router-dom';
import crudService from '../api/crudService';

class Cadastro extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      alert: "",
      showAlertErro : false,
      loading : false, 
      saving : false,
      redirect : false, 
      usuario : {
        id : "",
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

  componentWillUnmount() {
    this._isMounted = false;
}
  componentDidMount(){
    this._isMounted = true;
    const editId = this.props.match.params.id;
    if(editId) {
        this.setState({ loading: true, usuario : { id : editId  }});
        crudService.getUsuarioProfissional(editId, 
          usuarioProfisional => {
            if(this._isMounted) { 
              this.setState({ usuario : usuarioProfisional, loading : false});
              document.getElementById("senha").required = false;
              document.getElementById("foto").required = false;
              if(usuarioProfisional.euQuero !== "CONTRATAR") {
                document.getElementById("dados-perfil").style.display = "block";
                document.getElementById("select").value = "AMBOS";
                document.getElementById("endereco").required = true;
                document.getElementById("telefone").required = true;
                document.getElementById("email").required = true;
                document.getElementById("valor").required = true;
                document.getElementById("descricao").required = true;
              }
            }
          }, 
          error => {
            if(error.response) {
              if(error.response.status === 404) {
                this.setState({ error : "Usuário não encontrado", loading : false });
              } else {
                this.setState({ error : `Erro: ${error.response.data.error}`})
              }
            } else {
              this.setState({ error : `Erro na requisição: ${error.message} `})
            }
          })
    }
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }

  onSubmitHandler(event){
    event.preventDefault();
    this.setState({ alert : "", saving : true });
    var euQuero = document.getElementById("select").value;
    if( euQuero === "Contratar") {
        if(this.state.usuario.id) {
            CrudService.atualizarUsuario(this.state.usuario, 
              () => this.setState({ saving : false, alert : "Atualização feita com sucesso!", 
              showAlertErro : false}), 
              error => this.onSetError(error));
        } else {
          CrudService.cadastrarUsuario(this.state.usuario, 
            () => this.setState({saving: false, redirect : true}), 
            error => this.onSetError(error));
        }
    } else {
       if(this.state.usuario.id) {
            CrudService.atualizarProfissional(this.state.usuario, 
              () => this.setState({ saving : false, alert : "Atualização feita com sucesso!",
               showAlertErro : false}),
              error => this.onSetError(error));
              document.documentElement.scrollTop = 0; 
              document.body.scrollTop = 0;
        } else {
      CrudService.cadastrarProfissional(this.state.usuario,
        () => this.setState({ saving : false, redirect : true}),
        error => this.onSetError(error));
      }
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
       this.setState({ alert : `Erro: ${messageError}`, showAlertErro : true, saving : false});
      } else {
        this.setState({ alert : `Erro: ${error.response.data.titulo}`, showAlertErro : true, saving : false});
      }
    } else {
      this.setState({ alert : `Erro na requisão: ${error.message}`, showAlertErro : true, saving : false})
    }
    document.documentElement.scrollTop = 380; 
    document.body.scrollTop = 380;
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
    if(AuthService.isAuthenticated() && !this.props.edit) {
      return  (<Redirect to="/busca" /> );
    }
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
        {this.state.loading ? <Loader /> : 
        <section className="container">
          <form className={`form form-cadastro grid-9 ${this.state.error ? "form-alert-cadastro" : ""}`} id="form-cadastro"   onSubmit={this.onSubmitHandler}>
            <h1 className="title-form">Cadastro</h1>
            { this.state.alert ? <Alert message={this.state.alert} error={this.state.showAlertErro} /> : "" }
            <label htmlFor="nome" className={`label-form ${this.state.error ? "" : "label-alert"}`} >Nome</label>
            <input type="text" id="nome" className="txt-form" required  value={this.state.usuario.nome}
                onChange={event => this.onInputUsuarioChangeHandle(event)} name="nome" />
            <label htmlFor="usuario" className="label-form" >Usuário</label>
            <input type="text" id="usuario" className="txt-form" required value={this.state.usuario.usuario}
                onChange={event => this.onInputUsuarioChangeHandle(event)}  name="usuario"/>
            <label htmlFor="senha" className="label-form">Senha</label>
            <input type="password" id="senha" className="txt-form" required  autoComplete = "senha atual"
               onChange={event => this.onInputUsuarioChangeHandle(event)} name="senha" />
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
              <input type="text" id="endereco" className="txt-form"  value={this.state.usuario.endereco}
                  onChange={event => this.onInputUsuarioChangeHandle(event)} name="endereco"/>
              <label htmlFor="telefone" className="label-form" >Telefone</label>
              <input type="text" id="telefone" className="txt-form"  value={this.state.usuario.telefone}
                   onChange={event => this.onInputUsuarioChangeHandle(event)} name="telefone"/>
              <label htmlFor="email" className="label-form" >E-mail</label>
              <input type="email" id="email" className="txt-form"  value={this.state.usuario.email}
                   onChange={event => this.onInputUsuarioChangeHandle(event)} name="email"/>
              <label htmlFor="valor" className="label-form" >Valor/Hora</label>
              <input type="text" id="valor" className="txt-form"  value={this.state.usuario.valorHora}
                     onChange={event => this.onInputUsuarioChangeHandle(event)} name="valorHora" />
              <label htmlFor="descricao" className="label-form" >Descrição</label>
              <textarea id="descricao" className="txt-area-form" value={this.state.usuario.descricao}
               placeholder="Ex: faxina, manicure, fotografia, etc..."  
               onChange={event => this.onInputUsuarioChangeHandle(event)} name="descricao"></textarea>
            </div>
            <button type="submit" className="btn-form btn-form-cadastro" disabled={this.state.saving}>
                {this.state.saving ? 
                <Loader /> : "Salvar"}
            </button>
          </form>
        </section> }
        <FooterAzul isWithButton={false}/>
      </div>
    );
  }
}

export default Cadastro;