import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Header from './components/Header';
import Cadastro from './components/Cadastro';
import Busca from './components/Busca';
import Perfil from './components/Perfil';
import {AuthContext, useAuth} from './apiHooks/useAuth'
import { AlertContext, useAlert } from './apiHooks/useAlert';


 const App = () => {

   const auth = useAuth();
   const alert = useAlert();

    return (
      <AlertContext.Provider value={alert} >
        <AuthContext.Provider value={auth}>
          <BrowserRouter>
            <Header />
            <div className="App">
              <Switch>
                <Route exact path="/login" render={(props) => <Login {...props} />} />
                <Route exact path="/cadastro" component={Cadastro}/>
                <Route exact path="/cadastro/:id" render={(props) => <Cadastro {...props} edit={true} />} />
                <Route exact path="/busca" component={Busca}/>
                <Route exact path="/perfil/:id" render={(props) => <Perfil {...props} /> }/>
                <Route path="/" component={Home}/>
              </Switch>
            </div>
          </BrowserRouter>
        </AuthContext.Provider>
      </AlertContext.Provider>
    );
  }


export default App;
