import React, { Component } from 'react';
import FooterEscuro from './FooterEscuro';
import Loader from './Loader'
import AuthService from '../api/AuthService';
import { Redirect } from 'react-router-dom';


class Perfil extends Component {

  constructor(props) {
    super(props);
    this.state = {
      processing: false
    }
    this.submitContratarHandler = this.submitContratarHandler.bind(this);
    this.submitComentarioHandler = this.submitComentarioHandler.bind(this);
    this.doComentario = this.doComentario.bind(this);
  }
  
  submitContratarHandler(){
    this.setState({processing: true});
    setTimeout(this.doComentario, 5000);
  }

  doComentario(){
    var resp = window.confirm("Obrigado por confiar na Hire! Avalie o nosso profissional para ajuda-lo a conseguir novas oportunidades");
    if(resp === true) {
      document.getElementById("div-comentario-avaliacao").style.display = "block";
      document.documentElement.scrollTop = 1;
      document.body.scrollTop = 1;
    }
    this.setState({processing: false});
  }

  submitComentarioHandler() {
    this.setState({processing: true});
  }

  componentDidMount(){
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  render() {
    if(!AuthService.isAuthenticated()) {
        return ( <Redirect to="/login" /> )
    }
    return (
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
                  src="../../img/profissiona-perfil.png"></img>
                <span className="nome-profissional-perfil">Elize Cristiane</span>
                <span className="dados-profissional-perfil">Rua alvorada do Sul 987, Centro - SP</span>
                <span className="dados-profissional-perfil">(11) 99999-9999</span>
                <span className="dados-profissional-perfil">elize@gmail.com</span>
                <span className="dados-profissional-perfil">manicure, pedicure, faxina, limpeza, tarefas de casa.</span>
                <span className="dados-profissional-perfil dados-profissional-perfil-bold">R$ 40/h</span>
                <button type="submit" onClick={this.submitContratarHandler} className="btn-form"
               disabled={this.state.processing}>
               {this.state.processing ? <Loader /> : "Contratar"} </button>
              </div>
          </div>
        </section>
        <section className="container">
          <h1 className="conteudo-title">Avaliações</h1>
          <div className="div-comentario-avaliacao" id="div-comentario-avaliacao">
            <form>
              <textarea placeholder="Avalie este profissional..." className="text-comentario-avalicao grid-12"></textarea>
              <button type="submit" className="btn-comentario-avaliacao" onClick={this.submitComentarioHandler}
               disabled={this.state.processing}>
               {this.state.processing ? <Loader /> : "Publicar"} </button>
            </form>
          </div>
          <ul className="ul-comentarios">
            <li className="bg-comentario-avaliacao grid-12">
              <div className="foto-nome-autor">
                <img alt="Foto Cliente Avaliação" src="../../img/img-autor.png"
                 className="foto-autor-avaliacao"></img>
                 <span className="nome-autor-avaliacao">Leticia Alves</span>
              </div>
              <textarea className="txt-comentario-avaliacao" readOnly defaultValue="Muito educada e trabalha super bem, a faxina aqui em casa foi muito bem feita, eu recomendo e contrataria novamente"/>
            </li>
            <li className="bg-comentario-avaliacao grid-12">
              <div className="foto-nome-autor">
                <img alt="Foto Cliente Avaliação" src="../../img/img-autor.png"
                 className="foto-autor-avaliacao"></img>
                 <span className="nome-autor-avaliacao">Leticia Alves</span>
              </div>
              <textarea className="txt-comentario-avaliacao" readOnly defaultValue="Muito educada e trabalha super bem, a faxina aqui em casa foi muito bem feita, eu recomendo e contrataria novamente"/>
            </li>
            <li className="bg-comentario-avaliacao grid-12">
              <div className="foto-nome-autor">
                <img alt="Foto Cliente Avaliação" src="../../img/img-autor.png"
                 className="foto-autor-avaliacao"></img>
                 <span className="nome-autor-avaliacao">Leticia Alves</span>
              </div>
              <textarea className="txt-comentario-avaliacao" readOnly defaultValue="Muito educada e trabalha super bem, a faxina aqui em casa foi muito bem feita, eu recomendo e contrataria novamente"/>
            </li>
          </ul>
        
        </section>
        <FooterEscuro />
      
      </div>
       
    );
  }
}

export default Perfil;