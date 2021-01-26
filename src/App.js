import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Header';
import FooterAzul from './components/FooterAzul';
import FooterEscuro from './components/FooterEscuro';

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
            <Route path="/" render={ () => <Home /> }/>
          </Switch>
       
        { window.location.pathname === "/form" ? 
              <FooterEscuro /> : <FooterAzul isWithButton={true}/>
        }
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
