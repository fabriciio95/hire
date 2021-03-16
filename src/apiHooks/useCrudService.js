import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../apiHooks/useAuth";
import { AlertContext } from "./useAlert";


export const useCrudService = () => {

  const alert = useContext(AlertContext);
  const auth = useContext(AuthContext);
  const [saving, setSaving] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usuarioUpdated, setUsuarioUpdated] = useState(null);
  const [usuarioLoaded, setUsuarioLoaded] = useState(null);
  
  
  const cadastrarUsuario = async (usuario) => {
    setSaving(true);
    setError(null);
    alert.zerarState();
    setRedirect(false);
    try {
      await axios.post(`http://localhost:8080/usuario`, usuario);
      alert.setAlert("Cadastro realizado com sucesso!");
      setSaving(false);
      setRedirect(true);
    } catch(error) {
      handleError(error);
    }
  }

  const atualizarUsuario = async (usuario) => {
    setSaving(true);
    alert.zerarState();
    setUsuarioUpdated(null);
    setError(null);
    setRedirect(false);
    try {
      let response = await axios.put(`http://localhost:8080/usuario/${usuario.id}`, usuario,
           buildHeaderAuthorization());
      setUsuarioUpdated(response.data)
      alert.setAlert("Atualização feita com sucesso!");
      setSaving(false);
    } catch(error) {
      handleError(error);
    }
  }

  const cadastrarProfissional = async (profissional) => {
    setSaving(true);
    alert.zerarState();
    setError(null);
    setRedirect(false);
    try {
      await axios.post(`http://localhost:8080/profissional`, profissional);
      setSaving(false);
      alert.setAlert("Cadastro realizado com sucesso!");
      setRedirect(true);
    } catch (error) {
      handleError(error);
    }
  }

  const atualizarProfissional = async (profissional) => {
    setSaving(true);
    alert.zerarState();
    setUsuarioUpdated(null);
    setError(null);
    setRedirect(false);
    try {
        var response = await axios.put(`http://localhost:8080/profissional/${profissional.id}`, profissional,
                buildHeaderAuthorization());
        setUsuarioUpdated(response.data);
        alert.setAlert("Atualização feita com sucesso!");
        setSaving(false);
    } catch (error) {
      handleError(error);
    }
  }

  const getPerfilProfissional = async (id) => {
    setLoading(true);
    setUsuarioLoaded(null);
    setError(null);
    try {
      const response = await  axios.get(`http://localhost:8080/profissional/perfil/${id}`,
         buildHeaderAuthorization());
      setUsuarioLoaded(response.data);
      setLoading(false);
    } catch(error) {
      console.log(error)
    }
  }

  const clearUsuarioLoaded = () => {
    setUsuarioLoaded(null);
  }

  const getUsuarioProfissional = async (id) => {
    setLoading(true);
    setError(null);
    setUsuarioLoaded(null);
    try {
      var response = await axios.get(`http://localhost:8080/usuario-profissional/${id}`, buildHeaderAuthorization());
      setUsuarioLoaded(response.data);
      setLoading(false);
    } catch (error) {
      if(error.response) {
        if(error.response.status === 404 || error.response.status === 400) {
          alert.setAlert("Usuário não encontrado");
          alert.setShowAlertErro(true);
        } else {
          alert.setAlert(`Erro: ${error.response.data.error}`);
          alert.setShowAlertErro(true);
        }
      } else {
          alert.setAlert( `Erro na requisição: ${error.message} `);
          alert.setShowAlertErro(true);
      }
      setLoading(false);
    }
  }

  const fazerAvaliacao = async (avaliacao) => {
    setError(null);
    setSaving(true);
    try {
      await axios.post(`http://localhost:8080/avaliacao/publicar`, avaliacao,buildHeaderAuthorization());
      setSaving(false);
    } catch(error) {
      handleError(error);
    }
  }

  const buildHeaderAuthorization = () => {
      return {
        headers : {
            "Authorization" : `Bearer ${auth.credentials.token}`
        }
      }
  }

  const handleError = (error) => {
    console.log(error);
    setError(error);
    if(error.response) {
      if(error.response.data.campos) {
        var messageError = "";
       var campos = error.response.data.campos;
       for(var i = 0; i < campos.length; i++){
          messageError += campos[i].mensagem;
       }
       alert.setAlert(`Erro: ${messageError}`);
      } else {
        alert.setAlert(`Erro: ${error.response.data.titulo}`);
      }
      alert.setShowAlertErro(true);
      setSaving(false);
    } else {
      alert.setAlert(`Erro na requisão: ${error.message}`);
      alert.setShowAlertErro(true);
      setSaving(false);
    }
    document.documentElement.scrollTop = 380; 
    document.body.scrollTop = 380;
  }

  return {cadastrarUsuario, atualizarUsuario, cadastrarProfissional, atualizarProfissional, getPerfilProfissional, 
        getUsuarioProfissional, fazerAvaliacao, clearUsuarioLoaded, error, saving, redirect, loading, usuarioLoaded, usuarioUpdated };
}