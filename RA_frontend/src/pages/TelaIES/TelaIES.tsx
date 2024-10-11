import React, { useState, useEffect } from 'react';
import './TelaIES.css';
import instituicaoImagem from '../../assets/imgs/logoies.png';
import { useNavigate } from 'react-router-dom';

interface Mentoria {
  mentor: string;
  hour: string;
  agressorNome: string;
  agressorContato: string;
  aceitou: boolean | null;
}

const InstituicaoPage: React.FC = () => {
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [instituicaoNome] = useState('UNINASSAU Graças');
  const [mensagem] = useState('Bem-vindo à nossa plataforma de mentorias!');

  useEffect(() => {
    const fetchMentorias = async () => {
      try {
        const response = await fetch('https://rabackend-production-0e39.up.railway.app/mentoria/agenda');
        if (response.ok) {
          const data = await response.json();
          setMentorias(data);
          const mentoriasComStatusNull = data.map((mentoria: Mentoria) => ({ ...mentoria, aceitou: null }));
          setMentorias(mentoriasComStatusNull);
        } else {
          console.error('Falha ao buscar as mentorias.');
        }
      } catch (error) {
        console.error('Erro ao buscar as mentorias:', error);
      }
    };

    fetchMentorias();
  }, []);

  const handleAceitarRecusarMentoria = (index: number, aceitou: boolean) => {
    const updatedMentorias = [...mentorias];
    updatedMentorias[index].aceitou = aceitou;
    setMentorias(updatedMentorias);
  };

  const navigate = useNavigate();
  
  const handleLogoff = () => {
    // Limpar os dados de autenticação (se houver) e redirecionar o usuário para a página de login ou inicial
    // Exemplo:
    localStorage.removeItem('token'); // Limpar o token de autenticação do localStorage (se estiver sendo usado)
    navigate('/login'); // Redirecionar o usuário para a página de login
  };

  
  return (
    <div className="instituicao-container">
      <header className="instituicao-header">
        <img src={instituicaoImagem} alt="Logo da Instituição" className="instituicao-imagem" />
        <h1>{instituicaoNome}</h1>
        <p className="instituicao-mensagem">{mensagem}</p>
        {/* Adicione um botão ou link para fazer logoff */}
        <button className="off" onClick={handleLogoff}>Logoff</button>
      </header>
      <h2>Agenda de Mentorías da Instituição</h2>
      <div className="mentoria-list">
        {mentorias.length > 0 ? (
          mentorias.map((mentoria, index) => (
            <div key={index} className={`mentoria-item ${mentoria.aceitou === true ? 'aceitou' : mentoria.aceitou === false ? 'recusou' : ''}`}>
              <p><strong>Mentor:</strong> {mentoria.mentor}</p>
              <p><strong>Horário:</strong> {mentoria.hour}</p>
              <p><strong>Nome do Agressor:</strong> {mentoria.agressorNome}</p>
              <p><strong>Contato do Agressor:</strong> {mentoria.agressorContato}</p>
              <div className="acao-mentoria">
                <button className='ok' onClick={() => handleAceitarRecusarMentoria(index, true)}>Aceitar</button>
                <button className='ok' onClick={() => handleAceitarRecusarMentoria(index, false)}>Recusar</button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhuma mentoria agendada.</p>
        )}
      </div>
    </div>

    
  );
};

export default InstituicaoPage;
