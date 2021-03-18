import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FooterAzul from './FooterAzul';
import Loader from './Loader'
import Alert from './Alert';
import { useBuscaService } from '../apiHooks/useBucaService';

const Busca =  () => {
  const useBusca = useBuscaService();
  const [description, setDescription] = useState("");

  useEffect(() => {
    document.documentElement.scrollTop = 0; 
    document.body.scrollTop = 0;
  }, []);

  const searchSubmitHandler = () => {
    useBusca.searchByDescription(description);
    abrirSessaoDeDados();
  }

  function abrirSessaoDeDados() {
    document.getElementById("result-search").style.display = "block";
  }
  
    return (
      <div>
        <section className="introducao-busca">
          <div className="container">
            <h1 className="introducao-title">BUSQUE OS PROFISSIONAIS MAIS QUALIFICADOS</h1>
            <form>
                <input type="search" className="txt-introducao-busca" placeholder="Buscar profissionais..." 
                   value={description} required onChange={event => setDescription(event.target.value)}/>
                { useBusca.loading ? <Loader border={true} /> : 
              <input type="button" className="icone-txt-busca" value="" onClick={() => searchSubmitHandler()}/> }
            </form>
          </div>
        </section>
        <section className="result-search" id="result-search">
          <div className="container">
              <ul className="ul-cards">
                {useBusca.error !== "" ?
                 <div className="margin"><Alert  message={useBusca.error} error={true}/> </div> : 
                useBusca.profissionais.map(p => 
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

export default Busca;