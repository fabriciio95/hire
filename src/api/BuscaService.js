import axios from "axios";
import { ENDPOINT } from "../constants";


class BuscaService { 

  searchByDescription(description, onSuccess, onError){
    axios.get(`http://localhost:8080/search/${description}`)
      .then(response => onSuccess(response.data))
      .catch(error => onError(error));
  }
}

export default new BuscaService();