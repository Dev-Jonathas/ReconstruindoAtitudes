import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './mentorDashboard.css';

interface Horario {
  id: number;
  horario: string;
  emailMentor: string;
  agendado: boolean;
}

interface Anamnese {
  mentorado: {
    nome: string; // Nome do mentorado
  };
  pergunta1: string;
  pergunta2: string;
  pergunta3: string;
  pergunta4: string;
  pergunta5: string;
  pergunta6: string;
  pergunta7: string;
  pergunta8: string;
  pergunta9: string;
  pergunta10: string;
  pergunta11: string;
  pergunta12: string;
  pergunta13: string;
  pergunta14: string;
  pergunta15: string;
  pergunta16: string;
  pergunta17: string;
  pergunta18: string;
  pergunta19: string;
}

const MentorDashboard: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [newHorario, setNewHorario] = useState({ data: '', hora: '' }); // Estado para o novo horário
  const [anamneses, setAnamneses] = useState<Anamnese[]>([]);
  const navigate = useNavigate();



  // Função para buscar anamneses
  const fetchAnamneses = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const mentorId = localStorage.getItem('mentorId'); // Buscando o mentorId diretamente
  
      if (!token || !mentorId) {
        navigate('/login');
        return;
      }
      const response = await fetch('http://localhost:8080/anamnese/listar', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: Anamnese[] = await response.json();

        
        setAnamneses(data);
      } else {
        const errorResponse = await response.json();
        console.error('Erro ao buscar anamneses:', errorResponse.message || 'Erro desconhecido');
        alert('Erro ao carregar anamneses.');
      }
    } catch (error) {
      console.error('Erro ao buscar anamneses:', error);
      alert('Não foi possível carregar as anamneses. Verifique sua conexão.');
    }
  }, [navigate]);

  // Função para buscar horários
  const fetchHorarios = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const mentorId = localStorage.getItem('mentorId'); // Buscando o mentorId diretamente
  
      if (!token || !mentorId) {
        navigate('/login');
        return;
      }

      
      const response = await fetch(`http://localhost:8080/horario/retorna/${mentorId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const horariosData = await response.json();
        const formattedHorarios = horariosData.map((horario: any) => ({
          id: horario.id,
          emailMentor: horario.emailMentor,
          horario: new Date(horario.horario).toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          agendado: horario.agendado,
        }));

        setHorarios(formattedHorarios);
      } else {
        const errorResponse = await response.json();
        console.error('Erro ao carregar horários:', errorResponse.message || 'Erro desconhecido');
        alert('Erro ao carregar horários. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      alert('Não foi possível carregar os horários. Verifique sua conexão.');
    }
  }, [navigate]);

  // useEffect para carregar dados
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchHorarios();
      fetchAnamneses();
    }
  }, [fetchHorarios, fetchAnamneses, navigate]);



  // Função para criar novo horário
  const handleCreateHorario = async () => {
    try {
    const token = localStorage.getItem('token');
      const mentorId = localStorage.getItem('mentorId'); // Buscando o mentorId diretamente
  
      if (!token || !mentorId) {
        navigate('/login');
        return;
      }

      if (!newHorario.data || !newHorario.hora) {
        alert('Por favor, preencha todos os campos de data e hora.');
        return;
      }

      const fullDateTime = `${newHorario.data}T${newHorario.hora}:00`; // Corrigido para formar data e hora corretas

      const newHorarioPayload = {
        mentorId: mentorId,
        horario: fullDateTime,
      };

      const response = await fetch('http://localhost:8080/horario/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(newHorarioPayload),
      });

      if (response.ok) {
        const createdHorario: Horario = await response.json();
        setHorarios((prevHorarios) => [...prevHorarios, createdHorario]);
        setNewHorario({ data: '', hora: '' });
      } else {
        const errorResponse = await response.json();
        console.error('Erro ao criar horário:', errorResponse.message || 'Erro desconhecido');
        alert('Erro ao criar horário. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao criar horário:', error);
      alert('Erro ao criar horário. Verifique sua conexão.');
    }
  };

  // Função para deletar horário
  const handleDeleteHorario = async (horarioId: number) => {
    try {
      const token = localStorage.getItem('token');
      const mentorId = localStorage.getItem('mentorId'); // Buscando o mentorId diretamente
  
      if (!token || !mentorId) {
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:8080/horario/deletar/${horarioId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setHorarios((prevHorarios) => prevHorarios.filter((horario) => horario.id !== horarioId));
        alert('Horário deletado com sucesso.');
      } else {
        const errorResponse = await response.json();
        console.error('Erro ao deletar horário:', errorResponse.message || 'Erro desconhecido');
        alert('Erro ao deletar horário. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao deletar horário:', error);
      alert('Erro ao deletar horário. Verifique sua conexão.');
    }
  };

  // Função para logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { state: { message: 'Você saiu da conta.' } });
  };

  return (
    <div className="mentor-dashboard">
      <header className="dashboard-header">
        <h1>Bem-vindo, Mentor</h1>
        <button onClick={handleLogout} className="logout-button">Sair</button>
      </header>

      <main>
        <h2>Criar Novo Horário</h2>
        <div className="create-horario-form">
          <label>
            Data:
            <input
              type="date"
              value={newHorario.data}
              onChange={(e) => setNewHorario({ ...newHorario, data: e.target.value })}
              style={{marginLeft: "10px",}}
            />
          </label>
          <label>
            Hora:
            <input
              type="time"
              value={newHorario.hora}
              onChange={(e) => setNewHorario({ ...newHorario, hora: e.target.value })}
              style={{marginLeft: "10px",}}
            />
          </label>
          <button onClick={handleCreateHorario}>Criar Horário</button>
        </div>

        <h2>Horários Disponíveis</h2>
        {horarios.length > 0 ? (
          <div className="horarios-list">
            {horarios.map((horario) => (
              <div key={horario.id} className="horario-card">
                <p><strong>Hora:</strong> {horario.horario}</p>
                <p><strong>Status:</strong> {horario.agendado ? 'Agendado' : 'Disponível'}</p>
                {!horario.agendado && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteHorario(horario.id)}
                  >
                    Deletar
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Nenhum horário disponível.</p>
        )}
      </main>

      <main>
        <h2>Lista de Anamneses</h2>
        {anamneses.length > 0 ? (
          anamneses.map((anamnese, index) => (
            <div key={index} className="anamnese-card">
              <h3>Mentorado: {anamnese.mentorado.nome}</h3>
              <table className="anamnese-table">
                <thead>
                  <tr>
                    <th>Pergunta</th>
                    <th>Resposta</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(anamnese)
                    .filter(([key]) => key.startsWith('pergunta'))
                    .map(([key, value]) => (
                      <tr key={key}>
                        <td>{key}</td>
                        <td>{value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ))
        ) : (
          <p>Nenhuma anamnese encontrada.</p>
        )}
      </main>



    </div>
  );
};

export default MentorDashboard;
