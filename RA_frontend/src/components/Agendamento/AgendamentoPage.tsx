// AnamnesePage.js
import React from 'react';
import AgendarMentor from '../../pages/Tela-Agendamento/telaAgendamento';
import Header from '../../pages/Header/Header';
import Footer from '../../pages/Footer/Footer';

const AgendamentoPage: React.FC = () => {
  return (
    <div>
      <Header />
      <AgendarMentor />
      <Footer />
    </div>
  );
}

export default AgendamentoPage;
