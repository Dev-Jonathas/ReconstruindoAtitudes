import React, { useEffect, useState } from 'react';
import './Mentoresinicio.css';
import logomentor from '../../assets/imgs/logomentor.jpg';

interface Mentor {
  id: number;
  nome: string;
  bio: string;
}

const MentorPage: React.FC = () => {
  const [mentores, setMentores] = useState<Mentor[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMentores = async (nome?: string, bio?: string) => {
    try {
      // Monta a URL com os parâmetros de consulta (query string)
      let url = 'http://localhost:8080/mentor/listar?';
      if (nome) url += `nome=${encodeURIComponent(nome)}&`;
      if (bio) url += `bio=${encodeURIComponent(bio)}&`;
  
      // Remove o último '&' se existir
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }
  
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro ao buscar mentores: ${response.statusText} (${response.status})`);
      }
  
      // Exibe o conteúdo da resposta no console para depuração
      const responseBody = await response.json(); // Converte a resposta em JSON
  
      // Agora, acessamos os mentores no campo `body`
      const mentores = responseBody.body;
  
      if (Array.isArray(mentores)) {
        console.log('Mentores recebidos:', mentores);
        setMentores(mentores); // Armazena a lista de mentores no estado
        setError(null); // Limpa qualquer erro
      } else {
        throw new Error('Formato de resposta inválido');
      }
    } catch (err) {
      setError((err as Error).message);
    }
  };
  
  
  // Usando useEffect para carregar os mentores ao iniciar a página
  useEffect(() => {
    fetchMentores(); // Chamando a função sem filtros inicialmente
  }, []); // Reexecuta apenas uma vez ao montar o componente

  return (
    <div className="mentor-container">
      <h2>Nossos Mentores</h2>
      {error && <p className="error-message">{error}</p>}

      <div className="mentor-cards">
        {mentores.length > 0 ? (
          mentores.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <div className="mentor-info">
              <img src={logomentor} alt="Foto do Mentor" className="mentor-imagem" />
                <h3>{mentor.nome}</h3>  
                <p><strong>Bio:</strong> {mentor.bio}</p>
              </div>
            </div>
          ))
        ) : (
          !error && <p>Nenhum mentor encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default MentorPage;
