import axios from "axios";

class CrudService { 

  cadastrarUsuario(usuario, onSuccess, onError) {
    axios.post(`http://localhost:8080/usuario`, usuario)
      .then(() => onSuccess())
      .catch(e => onError(e));
  }

  cadastrarProfissional(profissional, onSuccess, onError) {
    axios.post(`http://localhost:8080/profissional`, profissional)
         .then(() => onSuccess())
         .catch(e => onError(e));
  }
}

export default new CrudService();