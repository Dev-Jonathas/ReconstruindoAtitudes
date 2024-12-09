import React, { useState, useEffect } from "react";
import "./TelaIES.css";
import { useNavigate } from "react-router-dom";

interface Mentoria {
  horario: string;
  mentorId: string;
  mentoradoId: string;
  mentorNome: string;
  mentoradoNome: string;
}

const InstituicaoPage: React.FC = () => {
  const [mentorias, setMentorias] = useState<Mentoria[]>([]);
  const [instituicaoNome, setInstituicaoNome] = useState("");
  const [mensagem] = useState("Bem-vindo à nossa plataforma de mentorias!");
  const [nomeMentor, setNomeMentor] = useState("");
  const [emailMentor, setEmailMentor] = useState("");
  const [bioMentor, setBioMentor] = useState("");
  const [senhaMentor, setSenhaMentor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedInstituicaoId = localStorage.getItem("instituicaoId");

    if (!token || !savedInstituicaoId) {
      navigate("/login");
    } else {
      fetchInstituicao(savedInstituicaoId);
    }
  }, [navigate]);

  const fetchInstituicao = async (instituicaoId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/instituicao/listar/${instituicaoId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setInstituicaoNome(data.nome);
      } else {
        console.error("Erro ao buscar nome da instituição.");
      }
    } catch (error) {
      console.error("Erro ao buscar instituição:", error);
    }
  };

  const fetchMentorias = async () => {
    const instituicaoId = localStorage.getItem("instituicaoId");
    
    if (instituicaoId === null) {
      console.error("InstituicaoId não encontrado");
      return;
    }
    
    const response = await fetch( `http://localhost:8080/mentoria/listar?instituicaoId=${instituicaoId}`);
  
    if (response.ok) {
      const data = await response.json();
    console.log("Resposta completa das mentorias:", data);
      
      // Filtrando mentorias de acordo com o id da instituição
      const mentoriasFiltradas = data.filter((mentoria: any) => 
        mentoria.mentor.instituicoes.some((instituicao: any) => instituicao.IesId === parseInt(instituicaoId))
      ).map((mentoria: any) => ({
        mentorId: mentoria.mentor.id,
        mentorNome: mentoria.mentor.nome,
        mentoradoId: mentoria.mentorado.id,
        mentoradoNome: mentoria.mentorado.nome,
        horario: mentoria.horario.horario,
      }));
      
      console.log("Mentorias filtradas:", mentoriasFiltradas);
      setMentorias(mentoriasFiltradas);
    } else {
      console.error("Erro ao buscar mentorias.");
    }
  };
  
  useEffect(() => {
    fetchMentorias();
  }, []);

  const handleLogoff = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("instituicaoId");
    navigate("/login");
  };

  const handleCadastrarMentor = async (event: React.FormEvent) => {
    event.preventDefault();

    const instituicaoId = localStorage.getItem("instituicaoId");
    if (!instituicaoId) {
      alert("Erro: ID da instituição não foi carregado.");
      return;
    }

    const mentorData = {
      nome: nomeMentor,
      email: emailMentor,
      bio: bioMentor,
      senha: senhaMentor,
      instituicaoId: instituicaoId,
    };

    try {
      const response = await fetch("http://localhost:8080/mentor/cadastro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(mentorData),
      });

      if (response.ok) {
        alert("Mentor cadastrado com sucesso!");
        setNomeMentor("");
        setEmailMentor("");
        setBioMentor("");
        setSenhaMentor("");
        fetchMentorias();
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
            maxLength={100}
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
          Mentor: {mentoria.mentorNome} - Mentorado: {mentoria.mentoradoNome} - 
          Data e Hora:{" "}
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
