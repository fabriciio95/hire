import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Header from './components/Header';
import Cadastro from './components/Cadastro';
import Busca from './components/Busca';

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
        <Header />
        <div className="App">
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/cadastro" component={Cadastro}/>
            <Route exact path="/busca" component={Busca}/>
            <Route path="/" component={Home}/>
          </Switch>
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
