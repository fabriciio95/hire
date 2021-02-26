import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BuscaService from '../api/BuscaService';
import FooterAzul from './FooterAzul';
import Loader from './Loader'
import Alert from './Alert';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      loading : false,
      error : "",
      profissionais: [] 
    }
    this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
    this.abrirSessaoDeDados = this.abrirSessaoDeDados.bind(this);
    this.onChangeSearchHandler = this.onChangeSearchHandler.bind(this);
  }

  componentDidMount(){
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }

  searchSubmitHandler() {
    this.setState({ loading : true, error: ""});
    BuscaService.searchByDescription(this.state.description, 
      prfs => {
        this.setState({profissionais: prfs, loading: false});
        document.documentElement.scrollTop = 300;
        document.body.scrollTop = 300;
      },
      () => {
        this.setState({ error : "Nenhum profissional encontrado!", loading: false});
        document.documentElement.scrollTop = 100;
        document.body.scrollTop = 100;
      });
      this.abrirSessaoDeDados();
  }

  abrirSessaoDeDados() {
    document.getElementById("result-search").style.display = "block";
  }
  
  onChangeSearchHandler(event) {
    const value = event.target.value;
    this.setState({ description : value });
  }

  render() {
    return (
      <div>
        <section className="introducao-busca">
          <div className="container">
            <h1 className="introducao-title">BUSQUE OS PROFISSIONAIS MAIS QUALIFICADOS</h1>
            <form>
                <input type="search" className="txt-introducao-busca" placeholder="Buscar profissionais..." 
                   value={this.state.description} required onChange={event => this.onChangeSearchHandler(event)}/>
                { this.state.loading ? <Loader border={true} /> : 
              <input type="button" className="icone-txt-busca" value="" onClick={() => this.searchSubmitHandler()}/> }
            </form>
          </div>
        </section>
        <section className="result-search" id="result-search">
          <div className="container">
              <ul className="ul-cards">
                {this.state.error !== "" ?
                 <div className="margin"><Alert  message={this.state.error} error={true}/> </div> : 
                this.state.profissionais.map(p => 
                <li className="cards-profissional grid-5" key={p.id}>
                    <div className="bg-foto-profissional">
                        <img src={p.fotoBase64} alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">{p.valorHora}</span>
                    <span className="nome-profissional">{p.nome}</span>
                    <span className="descricao-profissional">{p.descricao}</span>
                    <Link to={`/perfil/${p.id}`} className="btn-card-profissional">ver mais</Link>
                </li>
                )}
              </ul>
          </div>
        </section>
        <FooterAzul isWithButton={false}/>
      </div>
    );
  }
}

export default Busca;