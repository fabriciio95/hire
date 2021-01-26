import React, { Component } from 'react';

class FooterEscuro extends Component {  
  render() {
    return (
      <div>
        <section className="bg-footer-escuro">
          <div className="container">
            <h1 className="logo-text logo-footer">Hire</h1>
            <p className="txt-footer txt-footer-escuro">
              Sem currículos, sem cartas de apresentação apenas uma maneira simplificada de conectar 
              o cliente ao trabalhador mais rapidamente.
            </p>
          </div>
        </section>
        <footer className="bg-rodape bg-rodape-escuro">
          <div className="container">
            <p className="txt-rodape txt-rodape-escuro">
              <span className="logo-text logo-text-smaller logo-text-smaller-orange">Hire</span> - alguns direitos reservados
            </p>
          </div>
        </footer>
      </div>
    );
  }
}

export default FooterEscuro;