import axios from "axios";
import { useState } from "react";

export const useBuscaService = () => {

  const [profissionais, setProfissionais] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const searchByDescription = async (description) => {
    setLoading(true);
    setError("");
    try {
     var response = await axios.get(`https://tohireapp.herokuapp.com/search/${description}`);
     setProfissionais(response.data);
     document.documentElement.scrollTop = 300;
     document.body.scrollTop = 300;
     setLoading(false);
    } catch(error) {
      setError("Nenhum profissional encontrado!");
      document.documentElement.scrollTop = 100;
      document.body.scrollTop = 100;
      setLoading(false);
    }
  }

  return { searchByDescription, profissionais, loading, error};
}