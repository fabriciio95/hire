import axios from "axios";
import { CREDENTIALS_NAME, JWT_TOKEN_NAME } from "../constants";

class AuthService {

  login(usuario, senha, onLogin) {
      axios.post(`http://localhost:8080/login`, { usuario : usuario, senha : senha })
           .then(response =>  {
             const jwtToken = response.headers['authorization'].replace("Bearer ", "");
             sessionStorage.setItem(JWT_TOKEN_NAME, jwtToken);
             onLogin(true);
           }).catch((error)  => {
             console.log(error);
             onLogin(false);
            });
  }

  getJWTToken(){ 
    return sessionStorage.getItem(JWT_TOKEN_NAME);
  }
  

  isAuthenticated(){
    return sessionStorage.getItem(CREDENTIALS_NAME) != null;
  }

  logout(){
    sessionStorage.removeItem(JWT_TOKEN_NAME);
  }

  getJWTTokenData() {
    const jwtToken = this.getJWTToken();
    if(jwtToken == null) {
      return null;
    }

    const jwtTokenData = atob(jwtToken.split(".")[1]);
    return JSON.parse(jwtTokenData);
  }
}

export default new AuthService();