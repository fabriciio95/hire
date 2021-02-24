import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Header from './components/Header';
import Cadastro from './components/Cadastro';
import Busca from './components/Busca';
import Perfil from './components/Perfil';


 class App extends Component {

  constructor(props) {
    super(props);
    this.onRefreshHandler = this.onRefreshHandler.bind(this);
  }

  onRefreshHandler(){
    this.forceUpdate();
  }

   render() {
    return (
      <BrowserRouter>
        <Header onLinkClick={this.onRefreshHandler}/>
        <div className="App">
          <Switch>
            <Route exact path="/login" render={(props) => <Login {...props}
             onLoginSuccess={this.onRefreshHandler}/>} />
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route exact path="/cadastro/:id" render={(props) => <Cadastro {...props} edit={true} />} />
            <Route exact path="/busca" component={Busca}/>
            <Route exact path="/perfil" component={Perfil}/>
            <Route path="/" component={Home}/>
          </Switch>
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
