import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./telaAgendamento.css";

const AgendaMentor: React.FC = () => {
  const [mentores, setMentores] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>(""); // Para o horarioId
  const [availableHours, setAvailableHours] = useState<any[]>([]);
  const [mentoriaAgendada, setMentoriaAgendada] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mentoradoID = localStorage.getItem('mentoradoId'); // Retrieve mentoradoId from localStorage

  useEffect(() => {
    const mentoradoData = localStorage.getItem("mentoradoId");
    const token = localStorage.getItem("token");
    if (!mentoradoData || !token) {
      setError("Erro de autenticação. Faça login novamente.");
      setLoading(false);
      return;
    }

    const fetchMentores = async () => {
      try {
        const response = await fetch("http://localhost:8080/mentor/listar", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(
            `Erro ao buscar mentores: ${response.statusText} (${response.status})`
          );
        }

        const responseBody = await response.json();
        if (Array.isArray(responseBody.body)) {
          setMentores(responseBody.body);
          setError(null);
        } else {
          throw new Error("Formato de resposta inválido");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar mentores.");
      } finally {
        setLoading(false);
      }
    };

    fetchMentores();
  }, []);

  const fetchAvailableHours = async (mentorId: string) => {
    setAvailableHours([]); // Limpar horários anteriores
    setSelectedHour(""); // Resetar o horário selecionado

    try {
      const response = await fetch(
        `http://localhost:8080/horario/retorna/${mentorId}`, // Retorna apenas o mentorId
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar horários: ${response.statusText} (${response.status})`
        );
      }

      const responseBody = await response.json();
      if (Array.isArray(responseBody)) {
        setAvailableHours(responseBody);
      } else {
        throw new Error("Formato de resposta inválido");
      }
    } catch (err) {
      console.error("Erro ao buscar horários:", err);
    }
  };

  const confirmarAgendamento = async () => {
    const token = localStorage.getItem("token");

    // Formatar o agendamento para passar apenas o horarioId
    const agendamento = {
      mentoradoId: mentoradoID,
      mentorId: selectedMentor,
      horarioId: selectedHour, // Usamos o horarioId aqui
    };

    try {
      const response = await fetch("http://localhost:8080/mentoria/agendar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(agendamento),
      });

      if (!response.ok) {
        throw new Error(
          `Erro ao confirmar agendamento: ${response.statusText} (${response.status})`
        );
      }

      alert("Agendamento realizado com sucesso!");
      setMentoriaAgendada(true); // Redireciona após o agendamento bem-sucedido
    } catch (err) {
      console.error("Erro ao confirmar agendamento:", err);
      alert("Erro ao realizar o agendamento. Tente novamente.");
    }
  };

  if (mentoriaAgendada) {
    return <Navigate to="/user" />;
  }

  if (loading) {
    return <div>Carregando mentores...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <div className="mentor-container">
      <h2>Agende sua Mentoria</h2>

      <div className="mentor-select">
        <label htmlFor="mentor-select">Selecione um mentor:</label>
        <select
          id="mentor-select"
          value={selectedMentor || ""}
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedMentor(selected);
            if (selected) {
              fetchAvailableHours(selected); // Agora apenas o mentorId
            }
          }}
        >
          <option value="">Selecione um mentor</option>
          {mentores.map((mentor) => (
            <option key={mentor.id} value={mentor.id}>
              {mentor.nome}
            </option>
          ))}
        </select>
      </div>

      {selectedMentor && (
        <div className="hour-select">
          <label htmlFor="hour-select">Selecione um horário:</label>
          <select
            id="hour-select"
            value={selectedHour}
            onChange={(e) => setSelectedHour(e.target.value)}
          >
            <option value="">Selecione</option>
            {availableHours.length > 0 ? (
              availableHours.map((hour) => (
                <option key={hour.id} value={hour.id}>
                  {hour.horario} {/* Mostra a data e o horário */}
                </option>
              ))
            ) : (
              <option disabled>Sem horários disponíveis</option>
            )}
          </select>
        </div>
      )}

      {selectedMentor && selectedHour && (
        <button className="confirm-button" onClick={confirmarAgendamento}>
          Confirmar Agendamento
        </button>
      )}
    </div>
  );
};

export default AgendaMentor;
