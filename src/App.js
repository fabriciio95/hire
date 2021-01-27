import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Header from './components/Header';

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
            <Route path="/" component={Home}/>
          </Switch>
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
