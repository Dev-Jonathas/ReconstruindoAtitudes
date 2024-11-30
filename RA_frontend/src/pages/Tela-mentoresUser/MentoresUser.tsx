import React, { useEffect, useState } from 'react';
import logomentor from '../../assets/imgs/logomentor.jpg';

const MentorPage: React.FC = () => {
  const [mentores, setMentores] = useState<any[]>([]); // Estado para armazenar a lista de mentores
  const token = localStorage.getItem('token'); // Obtém o token do localStorage

  // Chama a função para buscar mentores dentro do useEffect
  useEffect(() => {
    if (!token) return; // Se não houver token, não faz nada

    const fetchMentores = async () => {
        try {
          const response = await fetch('http://localhost:8080/mentor/listar', {
            headers: {
              'Authorization': `Bearer ${token}`,
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
          } else {
            throw new Error('Formato de resposta inválido');
          }
        } catch (err) {
        }
      };
      
      
      
    fetchMentores(); // Chama a função para buscar os mentores

  }, [token]); // O efeito é executado sempre que o token mudar

  if (!token) {
    return <p>Você precisa estar logado para ver os mentores.</p>; // Se não houver token, exibe uma mensagem
  }

  return (
    <div className="mentor-container">
      <h2>Nossos Mentores</h2>
      <div className="mentor-cards">
        {Array.isArray(mentores) && mentores.length > 0 ? (
          mentores.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <img src={logomentor} alt="Foto do Mentor" className="mentor-imagem" />
              <div className="mentor-info">
                <h3>{mentor.nome}</h3>
                <p>{mentor.bio}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum mentor encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default MentorPage;
