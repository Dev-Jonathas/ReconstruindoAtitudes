import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import mentor1 from '../../assets/imgs/mentor1.png';
import mentor2 from '../../assets/imgs/mentor2.jpg';
import mentor3 from '../../assets/imgs/mentor3.jpg';
import './telaAgendamento.css';

const AgendaMentor: React.FC = () => {
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [mentoriaAgendada, setMentoriaAgendada] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string>('');
  const [agressorContato, setAgressorContato] = useState<string>('');
  const [agressorNome, setAgressorNome] = useState<string>('');


  useEffect(() => {
    // Recuperar os dados do usuário do armazenamento local
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { nome, contato } = JSON.parse(userData);
      setAgressorNome(nome);
      setAgressorContato(contato);
    }
  }, []);
  const handleMentorSelection = (mentorName: string) => {
    setSelectedMentor(mentorName);
    setMentoriaAgendada(false);
  };

  const handleHourSelection = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleAgendarMentoria = async () => {
    try {
      const response = await fetch('https://rabackend-production-0e39.up.railway.app/mentoria/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentor: selectedMentor,
          hour: selectedHour,
          agressorContato: agressorContato,
          agressorNome: agressorNome,
        }),
      });

      if (response.ok) {
        alert(`Sua mentoria com ${selectedMentor} será verificada pela IES!`);
        setSelectedMentor(null);
        setMentoriaAgendada(true);
      } else {
        console.error('Falha ao agendar a mentoria.');
      }
    } catch (error) {
      console.error('Erro ao agendar a mentoria:', error);
    }
  };

  if (mentoriaAgendada) {
    return <Navigate to="/" />;
  }

  return (
    <div className="mentor-container">
      <h2>Nossos Mentores</h2>

      <div className="mentor-cards">
        <div className="mentor-card" onClick={() => handleMentorSelection("Deangellis Berg")}>
          <img src={mentor1} alt="Mentor 1" />
          <div className="mentor-info">
            <h3>Deangellis Berg</h3>
            <p>Como mentor, compartilho minhas experiências e conhecimentos sobre o cyberbullying, destacando a importância do respeito online, da empatia e do cuidado com as palavras e ações virtuais.</p>
          </div>
        </div>

        <div className="mentor-card" onClick={() => handleMentorSelection("Arnaldo Willian")}>
          <img src={mentor2} alt="Mentor 2" />
          <div className="mentor-info">
            <h3>Arnaldo Willian</h3>
            <p>Como mentor, compartilho minhas experiências pessoais e conhecimentos especializados sobre o cyberbullying.</p>
          </div>
        </div>

        <div className="mentor-card" onClick={() => handleMentorSelection("Jonathas Xavier")}>
          <img src={mentor3} alt="Mentor 3" />
          <div className="mentor-info">
            <h3>Jonathas Xavier</h3>
            <p>Como mentor, ofereço orientação especializada na prevenção do cyberbullying.</p>
          </div>
        </div>
      </div>

      {selectedMentor && (
        <div className="agendamento-form">
          <div className="hour-select">
            <label htmlFor="hour-select">Selecione um horário:</label>
            <select id="hour-select" value={selectedHour} onChange={(e) => handleHourSelection(e.target.value)}>
              <option value="">Selecione</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
            </select>
          </div>
          <button className="agendar-button" onClick={handleAgendarMentoria}>
            Agendar com {selectedMentor}
          </button>
        </div>
      )}
    </div>
  );
};

export default AgendaMentor;
