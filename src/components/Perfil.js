import React, { Component } from 'react';
import FooterEscuro from './FooterEscuro';
import Loader from './Loader'
import AuthService from '../api/AuthService';
import { Redirect } from 'react-router-dom';
import crudService from '../api/crudService';
import Alert from './Alert'


class Perfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false,
      loading : false,
      saving : false,
      alert : "",
      profissional : {
        id : "",
        nome : "",
        endereco : "",
        telefone : "",
        email : "",
        descricao : "",
        valorHora : "",
        fotoBase64 : "",
        avaliacoes : []
      }, 
      avaliacao : {
        comentario : "",
        idAutor : "", 
        idProfissional : ""
      }
    }
    this.submitContratarHandler = this.submitContratarHandler.bind(this);
    this.submitComentarioHandler = this.submitComentarioHandler.bind(this);
    this.doComentario = this.doComentario.bind(this);
    this.onChangeComentario = this.onChangeComentario.bind(this);
  }
  
  submitContratarHandler(){
    this.setState({processing: true});
    setTimeout(this.doComentario, 5000);
  }

  doComentario(){
    var resp = window.confirm("Obrigado por confiar na Hire! Avalie o nosso profissional para ajuda-lo a conseguir novas oportunidades.");
    if(resp === true) {
      document.getElementById("div-comentario-avaliacao").style.display = "block";
      document.documentElement.scrollTop = 1000;
      document.body.scrollTop = 1000;
    }
    this.setState({processing: false});
  }

  onChangeComentario(event) {
    var field = event.target.name;
    var value = event.target.value;
    this.setState(prevState => ({ avaliacao : {...prevState.avaliacao, [field] : value }}));
    const idAutor = "idAutor";
    this.setState(prevState => ({ avaliacao : {...prevState.avaliacao, [idAutor] :
      AuthService.getJWTTokenData().userId}}));
    const idProfi = this.props.match.params.id;
    const idProfissional = "idProfissional";
    this.setState(prevState => ({ avaliacao : {...prevState.avaliacao, [idProfissional] : idProfi }}));
  }

  submitComentarioHandler(event) {
    event.preventDefault();
    this.setState({saving: true});
    crudService.fazerAvaliacao(this.state.avaliacao, 
      (data) => {
        this.state.profissional.avaliacoes.unshift(data);
        this.setState({ saving : false, avaliacao : { comentario : "" }, alert : ""});
        document.getElementById("div-comentario-avaliacao").style.display = "none";
      }, 
      error => { 
        console.log(error.response.data);
        if(error.response) {
          if(error.response.data.campos) {
            var messageError = "";
           var campos = error.response.data.campos;
           for(var i = 0; i < campos.length; i++){
              messageError += campos[i].mensagem;
           }
           document.getElementById("txt-comentario").style.marginTop = "10px";
           this.setState({ alert : `Erro: ${messageError}`, saving : false});
          } else {
            this.setState({ alert : `Erro: ${error.response.data.titulo}`, saving : false});
          }
        } else {
          this.setState({ alert : `Erro: ${error.message}`, saving : false});
        }
      });
  }

  componentDidMount() {
    const idProfi = this.props.match.params.id;
    this.setState({ loading : true });
    crudService.getPerfilProfissional(idProfi,
      data => this.setState({ profissional : data, loading : false }),
      error => console.log(error));
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  
  render() {
    if(!AuthService.isAuthenticated()) {
        return ( <Redirect to="/login" /> )
    }
    return (
      <div>
         {this.state.loading ? <Loader /> : 
         <div>
        <section className="introducao-perfil">
          <div className="container">
            <h1 className="logo-text title-perfil">Hire</h1>
            <h2 className="sub-title-perfil">Obtenha acesso instantâneo a um pool selecionado de profissionais de ponta que buscam ativamente sua próxima função.</h2>
          </div>
        </section>
        <section className="bg-perfil">
          <div className="container">
              <h1 className="conteudo-title conteudo-title-perfil">Perfil</h1>
              <div className="bg-id-perfil grid-16">
                <img alt="Foto do profissional" className="foto-perfil-profissional"
                  src={this.state.profissional.fotoBase64}></img>
                <span className="nome-profissional-perfil">{this.state.profissional.nome}</span>
                <span className="dados-profissional-perfil">{this.state.profissional.endereco}</span>
                <span className="dados-profissional-perfil">{this.state.profissional.telefone}</span>
                <span className="dados-profissional-perfil">{this.state.profissional.email}</span>
                <span className="dados-profissional-perfil">{this.state.profissional.descricao}</span>
                <span className="dados-profissional-perfil dados-profissional-perfil-bold">{this.state.profissional.valorHora}</span>
                <button type="submit" onClick={this.submitContratarHandler} className="btn-form"
               disabled={this.state.processing}>
               {this.state.processing ? <Loader /> : "Contratar"} </button>
              </div>
          </div>
        </section>
        <section className="container">
          <h1 className="conteudo-title">Avaliações</h1>
          { this.state.alert ? 
          <div className="margin-alert">
           <Alert message={this.state.alert} error={true} />
          </div>
           : "" }
          <div className="div-comentario-avaliacao" id="div-comentario-avaliacao">
            <form onSubmit={this.submitComentarioHandler}>
              <textarea placeholder="Avalie este profissional..." className="text-comentario-avalicao grid-12" 
                  name="comentario" value={this.state.avaliacao.comentario} id="txt-comentario"
                     onChange={e => this.onChangeComentario(e)} required/>
              <button type="submit" className="btn-comentario-avaliacao" 
               disabled={this.state.saving}>
               {this.state.saving ? <Loader /> : "Publicar"} </button>
            </form>
          </div>
          <ul className="ul-comentarios">
            {this.state.profissional.avaliacoes.length > 0 ?
            this.state.profissional.avaliacoes.map(autor => 
            <li className="bg-comentario-avaliacao grid-12" key={autor.id}>
              <div className="foto-nome-autor">
                <img alt="Foto Cliente Avaliação" src={autor.fotoAutorBase64}
                 className="foto-autor-avaliacao"></img>
                 <span className="nome-autor-avaliacao">{autor.nomeAutor}</span>
              </div>
              <textarea className="txt-comentario-avaliacao" readOnly value={autor.comentario} />
            </li>
          ) :   <div className="margin">
                <Alert  message="Este profissional ainda não possui avaliações" error={false}/>
             </div> }
          </ul>
        </section>
        <FooterEscuro />
        <div/>
      </div>
    }
    </div>
    );
  }
}

export default Perfil;