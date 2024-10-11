// MentorPage.js
import React from 'react';
import mentor1 from '../../assets/imgs/mentor1.png';
import mentor2 from '../../assets/imgs/mentor2.jpg';
import mentor3 from '../../assets/imgs/mentor3.jpg';
import '../Tela-Agendamento/telaAgendamento.css';



const Mentor: React.FC = () => {
  
  return (
      <div className="mentor-container">
        <h2>Nossos Mentores</h2>
  
        <div className="mentor-cards">
          {/* Card de Mentor 1 */}
          <div className="mentor-card">
            <img src={mentor1} alt="Mentor 1" />
            <div className="mentor-info">
              <h3>Deangellis Berg</h3>
              <p>Como mentor, compartilho minhas experiências e conhecimentos sobre o cyberbullying, destacando a importância do respeito online, da empatia e do cuidado com as palavras e ações virtuais.</p>
            </div>
          </div>
  
          {/* Card de Mentor 2 */}
          <div className="mentor-card">
            <img src={mentor2} alt="Mentor 2" />
            <div className="mentor-info">
              <h3>Arnaldo Willian</h3>
              <p>Como mentor, compartilho minhas experiências pessoais e conhecimentos especializados sobre o cyberbullying.</p>
            </div>
          </div>
  
          {/* Card de Mentor 3 */}
          <div className="mentor-card">
            <img src={mentor3} alt="Mentor 3" />
            <div className="mentor-info">
              <h3>Jonathas Xavier</h3>
              <p>Como mentor, ofereço orientação especializada na prevenção do cyberbullying.</p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Mentor;
