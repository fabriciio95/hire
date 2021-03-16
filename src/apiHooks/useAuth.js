import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { CREDENTIALS_NAME} from "../constants";


export const AuthContext = createContext();

export const useAuth = () => {
  const [credentials, setCredentials] = useState({ id : null, token : null });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, []);

  const login = async (usuario, senha, onError) => {
    const dataUser = { usuario : usuario, senha : senha };
    setProcessing(true);
    try {
      const response = await axios.post(`http://localhost:8080/login`, dataUser);
      const token = response.headers['authorization'].replace("Bearer ", "");
      storeCredentials(token);
      setProcessing(false);
    } catch(error) {
      setProcessing(false);
      onError(true);
    }

  }

 const storeCredentials = (token) => {
   const tokenData = JSON.parse(atob(token.split(".")[1]));
   const credentials = { id : tokenData.userId, token : token };
   sessionStorage.setItem(CREDENTIALS_NAME, JSON.stringify(credentials));
   setCredentials(credentials);
 }

 const loadCredentials = () => {
   const storedCredentials = sessionStorage.getItem(CREDENTIALS_NAME);
   if(storedCredentials !== null) {
      setCredentials(JSON.parse(storedCredentials));
   }
 }

 const logout = () => {
  sessionStorage.removeItem(CREDENTIALS_NAME);
  setCredentials({ id : null, token : null });
 }

 const isAuthenticated = () => {
   return sessionStorage.getItem(CREDENTIALS_NAME) !== null;
 }

 return { login, logout, isAuthenticated, setError, credentials, error, processing };
}