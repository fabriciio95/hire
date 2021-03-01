import axios from "axios";
import { useEffect, useState } from "react";
import { CREDENTIALS_NAME, JWT_TOKEN_NAME } from "../constants";

export const useAuth = () => {
  const [credentials, setCredentials] = useState({ id : null, token : null });
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, []);

  const login = async (usuario, senha) => {
    const dataUser = { usuario : usuario, senha : senha };
    setProcessing(true);
    try {
      const response = await axios.post(`http://localhost:8080/login`, dataUser);
      const token = response.headers['authorization'].replace("Bearer ", "");
      storeCredentials(token);
      setProcessing(false);
    } catch(error) {
      setError("Usuário ou senha inválidos!");
      setProcessing(false);
    }

  }

 const storeCredentials = (token) => {
   const tokenData = atob(token.split(".")[1]);
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

 return { login, logout, isAuthenticated, credentials, error, processing };
}