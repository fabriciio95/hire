import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FooterAzul from './FooterAzul';

class Busca extends Component {
  constructor(props) {
    super(props);
    this.searchSubmitHandler = this.searchSubmitHandler.bind(this);
  }

  componentDidMount(){
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }

  searchSubmitHandler() {
    const result = document.getElementById("result-search").style.display;
    if(result === "none") { 
      document.getElementById("result-search").style.display = "block";
    } else {
      document.getElementById("result-search").style.display = "none";
    }
  }
  
  render() {
    return (
      <div>
        <section className="introducao-busca">
          <div className="container">
            <h1 className="introducao-title">BUSQUE OS PROFISSIONAIS MAIS QUALIFICADOS</h1>
            <form>
                <input type="search" className="txt-introducao-busca" placeholder="Buscar profissionais..."/>
              <input type="button" className="icone-txt-busca" value="" onClick={() => this.searchSubmitHandler()}/>
            </form>
          </div>
        </section>
        <section className="result-search" id="result-search">
          <div className="container">
              <ul>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
                <li className="cards-profissional grid-5">
                    <div className="bg-foto-profissional">
                        <img src="../../img/profissional.png" alt="Imagem do profissional" className="img-profissional"></img>
                    </div>
                    <span className="preco-hora">R$ 40/h</span>
                    <span className="nome-profissional">Elize Cristiane</span>
                    <span className="descricao-profissional">manicure, pedicure faxina, limpeza, tarefas de casa.</span>
                    <Link to="/perfil" className="btn-card-profissional">ver mais</Link>
                </li>
              </ul>
          </div>
        </section>
        <FooterAzul isWithButton={false}/>
      </div>
    );
  }
}

export default Busca;