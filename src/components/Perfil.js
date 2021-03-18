import React, { useContext, useEffect, useState } from 'react';
import FooterEscuro from './FooterEscuro';
import Loader from './Loader'
import { Redirect } from 'react-router-dom';
import Alert from './Alert'
import { AlertContext } from '../apiHooks/useAlert';
import { AuthContext } from '../apiHooks/useAuth';
import { useCrudService } from '../apiHooks/useCrudService';


const Perfil = (props) => {
  const [processing, setProcessing] = useState(false);
  const alert = useContext(AlertContext);
  const auth = useContext(AuthContext);
  const useCrud = useCrudService();
  const [profissional, setProfissional] = useState(null);
  const [avaliacao, setAvaliacao] = useState({
      comentario : "",
      idAutor : auth.credentials.id, 
      idProfissional : props.match.params.id
    });
  
  const submitContratarHandler = () => {
    setAvaliacao({...avaliacao, comentario : ""});
    alert.zerarState();
    document.getElementById("div-comentario-avaliacao").style.display = "none"; 
    setProcessing(true);
  }

  useEffect(() => {
    if(processing === true) {
      sleep();
      doComentario();
    }
  }, [processing]);

  function sleep() {
    var cont = 0;
      while(cont < 999999999) {
        cont++;
      }
      cont = 0;
      while(cont < 999999999) {
        cont++;
      }
      cont = 0;
      while(cont < 999999999) {
        cont++;
      }
  }

  const doComentario = () => {
    var resp = window.confirm("Obrigado por confiar na Hire! Avalie o nosso profissional para ajuda-lo a conseguir novas oportunidades.");
    if(resp === true) {
      document.getElementById("div-comentario-avaliacao").style.display = "block";
      document.documentElement.scrollTop = 1000;
      document.body.scrollTop = 1000;
    }
    setProcessing(false);
  }

  const submitComentarioHandler = (event) => {
    event.preventDefault();
    useCrud.fazerAvaliacao(avaliacao, (isThereError) => {
      if(isThereError) {
        document.getElementById("txt-comentario").style.marginTop = "10px";
        document.documentElement.scrollTop = 1000;
        document.body.scrollTop = 1000;
      } else {
        setAvaliacao({...avaliacao, comentario : ""});
        alert.zerarState();
        document.getElementById("div-comentario-avaliacao").style.display = "none"; 
      }
    });
  }

  useEffect(() => {
    if(useCrud.avaliacaoLoaded) {
      profissional.avaliacoes.unshift(useCrud.avaliacaoLoaded);
      useCrud.clearAvaliacaoLoaded();
      alert.zerarState();
    }
    // eslint-disable-next-line
  }, [useCrud.avaliacaoLoaded]);

  useEffect(() =>  {
    const idProfi = props.match.params.id;
    useCrud.getPerfilProfissional(idProfi);
    setAvaliacao({...avaliacao, idProfissional : props.match.params.id, idAutor :  auth.credentials.id });
    alert.zerarState();
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if(useCrud.usuarioLoaded) {
      setProfissional(useCrud.usuarioLoaded);
      useCrud.clearUsuarioLoaded();
    }
    // eslint-disable-next-line
  }, [useCrud.usuarioLoaded]);

    if(!auth.isAuthenticated()) {
        return ( <Redirect to="/login" /> )
    }
    return (
      <div>
         {useCrud.loading || profissional === null ? <Loader big={true}/> : 
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
                  src={profissional.fotoBase64}></img>
                <span className="nome-profissional-perfil">{profissional.nome}</span>
                <span className="dados-profissional-perfil">{profissional.endereco}</span>
                <span className="dados-profissional-perfil">{profissional.telefone}</span>
                <span className="dados-profissional-perfil">{profissional.email}</span>
                <span className="dados-profissional-perfil">{profissional.descricao}</span>
                <span className="dados-profissional-perfil dados-profissional-perfil-bold">{profissional.valorHora}</span>
                <button type="submit" onClick={submitContratarHandler} className="btn-form"
               disabled={processing}>
               {processing ? <Loader /> : "Contratar"} </button>
              </div>
          </div>
        </section>
        <section className="container">
          <h1 className="conteudo-title">Avaliações</h1>
          { alert.alert ? 
          <div className="margin-alert">
           <Alert message={alert.alert} error={true} />
          </div>
           : "" }
          <div className="div-comentario-avaliacao" id="div-comentario-avaliacao">
            <form onSubmit={submitComentarioHandler}>
              <textarea placeholder="Avalie este profissional..." className="text-comentario-avalicao grid-12" 
                  name="comentario" value={avaliacao.comentario} id="txt-comentario"
                     onChange={e => setAvaliacao({...avaliacao, comentario : e.target.value})} required/>
              <button type="submit" className="btn-comentario-avaliacao" 
               disabled={useCrud.saving}>
               {useCrud.saving ? <Loader /> : "Publicar"} </button>
            </form>
          </div>
          <ul className="ul-comentarios">
            {profissional.avaliacoes.length > 0 ?
             profissional.avaliacoes.map(autor => 
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

export default Perfil;