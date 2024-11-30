import React, { useState, useEffect } from "react";
import "./TelaIES.css";
import instituicaoImagem from "../../assets/imgs/logoies.png";
import { useNavigate } from "react-router-dom";

interface Mentoria {
  horario: string;
  mentorId: string; // ID do mentor
  mentoradoId: string; // ID do mentorado (antes 'agressorId')
  mentorNome: string; // Nome do mentor
  mentoradoNome: string; // Nome do mentorado
}

const InstituicaoPage: React.FC = () => {
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [instituicaoNome] = useState("UNINASSAU Graças");
  const [mensagem] = useState("Bem-vindo à nossa plataforma de mentorias!");

  // Estado para cadastro do mentor
  const [nomeMentor, setNomeMentor] = useState("");
  const [emailMentor, setEmailMentor] = useState("");
  const [bioMentor, setBioMentor] = useState("");
  const [senhaMentor, setSenhaMentor] = useState("");

  const navigate = useNavigate();

  // Verifica se o token existe quando o componente é montado
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redireciona para o login se não houver token
    }
  }, [navigate]);

  const fetchMentorias = async () => {
    try {
      const response = await fetch("http://localhost:8080/mentoria/listar");
      if (response.ok) {
        const data = await response.json();

        const mentoriasComStatusNull = data.map((mentoria: any) => ({
          mentorId: mentoria.mentor.id,
          mentorNome: mentoria.mentor.nome,
          mentoradoId: mentoria.mentorado.id,
          mentoradoNome: mentoria.mentorado.nome,
          horario: mentoria.horario.horario, // Corrige para pegar a string do DateTime
        }));

        setMentorias(mentoriasComStatusNull);
      } else {
        console.error("Failed to fetch mentorias.");
      }
    } catch (error) {
      console.error("Error fetching mentorias:", error);
    }
  };

  useEffect(() => {
    fetchMentorias();
  }, []);

  // Função de logoff que remove o token e redireciona para o login
  const handleLogoff = () => {
    localStorage.removeItem("token"); // Limpar o token de autenticação do localStorage
    navigate("/login"); // Redirecionar o usuário para a página de login
  };

  // Função para cadastrar mentor
  const handleCadastrarMentor = async (event: React.FormEvent) => {
    event.preventDefault();

    const mentorData = {
      nome: nomeMentor,
      email: emailMentor,
      bio: bioMentor,
      senha: senhaMentor,
    };

    try {
      const response = await fetch("http://localhost:8080/mentor/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token do localStorage
        },
        body: JSON.stringify(mentorData),
      });

      if (response.ok) {
        alert("Mentor cadastrado com sucesso!");
        // Limpar os campos do formulário após o cadastro
        setNomeMentor("");
        setEmailMentor("");
        setBioMentor("");
        setSenhaMentor("");
        fetchMentorias(); // Atualiza a lista de mentorias após cadastrar o mentor
      } else {
        alert("Erro ao cadastrar o mentor!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar mentor:", error);
      alert("Erro ao cadastrar mentor!");
    }
  };

  return (
    <div className="instituicao-container">
      <button className="off" onClick={handleLogoff}>
        Sair
      </button>
      <header className="instituicao-header">
        <img
          src={instituicaoImagem}
          alt="Logo da Instituição"
          className="instituicao-imagem"
        />
        <h1>{instituicaoNome}</h1>
        <p className="instituicao-mensagem">{mensagem}</p>
      </header>

      <form onSubmit={handleCadastrarMentor} className="cadastro-container">
        <h2 className="h1Cadastro">Cadastro de Mentor</h2>
        <div>
          <label htmlFor="nomeMentor">Nome:</label>
          <input
            type="text"
            id="nomeMentor"
            value={nomeMentor}
            onChange={(e) => setNomeMentor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="emailMentor">E-mail:</label>
          <input
            type="email"
            id="emailMentor"
            value={emailMentor}
            onChange={(e) => setEmailMentor(e.target.value)}
            required
          />
        </div>
        <div className="bio">
          <label htmlFor="bioMentor">Bio:</label>
          <textarea
            id="bioMentor"
            value={bioMentor}
            onChange={(e) => setBioMentor(e.target.value)}
            required
            maxLength={100} // Limit to 100 characters
          />
        </div>
        <div>
          <label htmlFor="senhaMentor">Senha:</label>
          <input
            type="password"
            id="senhaMentor"
            value={senhaMentor}
            onChange={(e) => setSenhaMentor(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="BLogin">
          Cadastrar Mentor
        </button>
      </form>

      <h2>Agenda de Mentorías da Instituição</h2>
      <div className="mentoria-list">
        {mentorias.length > 0 ? (
          mentorias.map((mentoria, index) => (
            <div key={index} className="mentoria-item">
              <p>
                <strong>Mentor:</strong> {mentoria.mentorNome}
              </p>
              <p>
                <strong>Mentorado:</strong> {mentoria.mentoradoNome}
              </p>
              <p>
                <strong>Data e Hora:</strong>{" "}
                {new Date(mentoria.horario).toLocaleString("pt-BR", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
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
