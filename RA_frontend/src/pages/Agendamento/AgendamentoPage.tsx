// AnamnesePage.js
import React from 'react';
import AgendarMentor from '../../components/Tela-Agendamento/telaAgendamento';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

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
