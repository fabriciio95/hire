import React, { useContext, useEffect, useState } from 'react';
import FooterAzul from './FooterAzul';
import Alert from './Alert';
import Loader from './Loader'
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../apiHooks/useAuth';
import { useCrudService } from '../apiHooks/useCrudService'
import { AlertContext } from '../apiHooks/useAlert';

const Cadastro = props => {
  const useCrud = useCrudService();
  const useAuth = useContext(AuthContext);
  const alert = useContext(AlertContext);
  const [usuarioProfissional, setUsuarioProfissional] = useState({
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
  });

  
  
  useEffect(() => {
    const editId = props.match.params.id;
    alert.zerarState();
    if(editId) {
        useCrud.getUsuarioProfissional(editId);
    }
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
    // eslint-disable-next-line
  }, [useAuth.credentials]);

  useEffect(() => {
    if(useCrud.usuarioLoaded) {
      setUsuarioProfissional(useCrud.usuarioLoaded);
      useCrud.clearUsuarioLoaded();
    }
    // eslint-disable-next-line
  }, [useCrud.usuarioLoaded]);

  useEffect(() => {
    if(usuarioProfissional.id) {
        document.getElementById("senha").required = false;
        document.getElementById("foto").required = false;
        console.log("euQu " + usuarioProfissional.euQuero);
        if(usuarioProfissional.euQuero !== "Contratar" && usuarioProfissional.euQuero !== "CONTRATAR" ) {
          document.getElementById("dados-perfil").style.display = "block";
          putRequiredFieldsProfissional(true);
        }
    }
    // eslint-disable-next-line
  }, [usuarioProfissional]);

  const putRequiredFieldsProfissional = (ative) => {
      document.getElementById("endereco").required = ative;
      document.getElementById("telefone").required = ative;
      document.getElementById("email").required = ative;
      document.getElementById("valor").required = ative;
      document.getElementById("descricao").required = ative;
  }

  const onSubmitHandler = (event) => {
    event.preventDefault();
    var euQuero = document.getElementById("select").value;
    if( euQuero === "Contratar") {
        if(usuarioProfissional.id) {
          useCrud.atualizarUsuario(usuarioProfissional);
        } else {
          useCrud.cadastrarUsuario(usuarioProfissional);
        }
    } else {
       if(usuarioProfissional.id) {
            useCrud.atualizarProfissional(usuarioProfissional);
        } else {
            useCrud.cadastrarProfissional(usuarioProfissional);
      }
    }
  }



  
  const onInputFotoChangeHandler = () => {
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
        onSetStateBase64(fileBase64);
    }
  }

  const onSetStateBase64 = (fileBase64) => {
    setUsuarioProfissional({...usuarioProfissional, fotoBase64 : fileBase64.split(",")[1]});
 }

 const onInputUsuarioChangeHandler = (event) => {
   let field = event.target.name;
   let value = event.target.value;
   setUsuarioProfissional({...usuarioProfissional, [field] : value });
 }


  const dadosPerfilHandler = (event) => {
    const value = event.target.value;
    setUsuarioProfissional({...usuarioProfissional, euQuero : value});
    if(value === "SER_CONTRATADO" || value === "AMBOS") {
      document.getElementById("dados-perfil").style.display = "block";
      putRequiredFieldsProfissional(true);
    } else {
      document.getElementById("dados-perfil").style.display = "none";
      putRequiredFieldsProfissional(false);
    }
  }

    if(useAuth.isAuthenticated() && !props.edit) {
      return  (<Redirect to="/busca" /> );
    }
    if(useCrud.redirect) {
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
        {useCrud.loading ? <Loader /> : 
        <section className="container">
          <form className={`form form-cadastro grid-9 ${useCrud.error ? "form-alert-cadastro" : ""}`} id="form-cadastro"   onSubmit={onSubmitHandler}>
            <h1 className="title-form">Cadastro</h1>
            { alert.alert ? <Alert message={alert.alert} 
                error={alert.showAlertErro} /> : "" }
            <label htmlFor="nome" className={`label-form ${useCrud.error ? "" : "label-alert"}`} >Nome</label>
            <input type="text" id="nome"className="txt-form" required 
              value={usuarioProfissional.nome} onChange={event => onInputUsuarioChangeHandler(event)} name="nome" />
            <label htmlFor="usuario" className="label-form" >Usuário</label>
            <input type="text" id="usuario" className="txt-form" required 
              value={usuarioProfissional.usuario} onChange={event => onInputUsuarioChangeHandler(event)}  name="usuario"/>
            <label htmlFor="senha" className="label-form">Senha</label>
            <input type="password" id="senha" className="txt-form" required  autoComplete = "senha atual"
                onChange={event => onInputUsuarioChangeHandler(event)} name="senha" />
            <label htmlFor="foto" className="label-form">Foto: </label>
            <input type="file" id="foto" className="input-file-form"
                onChange={event => onInputFotoChangeHandler(event)} required />
            <label htmlFor="select" className="label-form">Eu vou: </label>
            <select id="select"  name="euQuero" className="select-form"
             onChange={e => dadosPerfilHandler(e)} value={usuarioProfissional.euQuero}>
              <option value="Contratar">Contratar</option>
              <option value="SER_CONTRATADO">Ser Contratado</option>
              <option  value="AMBOS">Ambos</option>
            </select>
            <div className="form-dados-perfil" id="dados-perfil" >
              <label htmlFor="endereco" className="label-form" >Endereço</label>
              <input type="text" id="endereco" className="txt-form"  defaultValue={usuarioProfissional.endereco}
                onChange={event => onInputUsuarioChangeHandler(event)} name="endereco"/>
              <label htmlFor="telefone" className="label-form" >Telefone</label>
              <input type="text" id="telefone" className="txt-form"  defaultValue={usuarioProfissional.telefone}
                   onChange={event => onInputUsuarioChangeHandler(event)} name="telefone"/>
              <label htmlFor="email" className="label-form" >E-mail</label>
              <input type="email" id="email" className="txt-form"  defaultValue={usuarioProfissional.email}
                   onChange={event => onInputUsuarioChangeHandler(event)} name="email"/>
              <label htmlFor="valor" className="label-form" >Valor/Hora</label>
              <input type="text" id="valor" className="txt-form"  defaultValue={usuarioProfissional.valorHora}
                   onChange={event => onInputUsuarioChangeHandler(event)} name="valorHora" />
              <label htmlFor="descricao" className="label-form" >Descrição</label>
              <textarea id="descricao" className="txt-area-form" 
               defaultValue={usuarioProfissional.descricao} placeholder="Ex: faxina, manicure, fotografia, etc..."  
               onChange={event => onInputUsuarioChangeHandler(event)} name="descricao"></textarea>
            </div>
            <button type="submit" className="btn-form btn-form-cadastro" disabled={useCrud.saving}>
                {useCrud.saving ? 
                <Loader /> : "Salvar"}
            </button>
          </form>
        </section> }
        <FooterAzul isWithButton={false}/>
      </div>
    );
  }

export default Cadastro;