import React, { useEffect, useState } from 'react';
import './AnamneseForm.css';
import { Link, useNavigate } from 'react-router-dom';

const AnamneseForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    genero: '',
    estadocivil: '',
    profissao: '',
    email: '',
    contato: '',
    pergunta1: '',
    pergunta2: '',
    pergunta3: '',
    pergunta4: '',
    pergunta5: '',
    pergunta6: '',
    pergunta7: '',
    pergunta8: '',
    pergunta9: '',
    pergunta10: '',
    pergunta11: '',
    pergunta12: '',
    pergunta13: '',
    pergunta14: '',
    pergunta15: '',
    pergunta16: '',
    pergunta17: '',
    pergunta18: '',
    pergunta19: '',
  });

  useEffect(() => {
    // Adiciona a classe ao corpo da página
    document.body.classList.add('anamnese-page');
    window.scrollTo(0, 0);
    return () => {
      // Remove a classe do corpo da página quando o componente for desmontado
      document.body.classList.remove('anamnese-page');
    };
  }, []);



  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formIsValid = Object.values(formData).every(value => value !== '');

    if (formIsValid) {

      fetch('https://rabackend-production-0e39.up.railway.app/agressor/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          navigate('/agendamento', { state: { formData: data , agressorNome: formData.nome, agressorContato: formData.contato} });
          localStorage.setItem('userData', JSON.stringify(formData));
        })
        .catch(error => {
          console.error('Error:', error.message || 'Failed to fetch');
          alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente mais tarde.');
        });

      setFormData({
        nome: '',
        dataNascimento: '',
        genero: '',
        estadocivil: '',
        profissao: '',
        email: '',
        contato: '',
        pergunta1: '',
        pergunta2: '',
        pergunta3: '',
        pergunta4: '',
        pergunta5: '',
        pergunta6: '',
        pergunta7: '',
        pergunta8: '',
        pergunta9: '',
        pergunta10: '',
        pergunta11: '',
        pergunta12: '',
        pergunta13: '',
        pergunta14: '',
        pergunta15: '',
        pergunta16: '',
        pergunta17: '',
        pergunta18: '',
        pergunta19: '',
      });

    } else {
      alert('Preencha todos os campos antes de enviar o formulário');
    }
  };


  return (
    <div className="anamnese-form">
      <h2>Formulário de Anamnese</h2>
      <h3>Informações Gerais:</h3>
      <form onSubmit={handleSubmit}>
        <div className="user-info">

          <label>
            Nome:
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </label>

          <label>
            Data de Nascimento:
            <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} />
          </label>


          <label>
            Gênero:
            <select name="genero" value={formData.genero} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Masculino">Masculino</option>
              <option value="Feminino">Feminino</option>
              <option value="Outro">Outro</option>
              <option value="Prefiro não dizer">Prefiro não dizer</option>
            </select>
          </label>

          <label>
            Estado Civil:
            <select name="estadocivil" value={formData.estadocivil} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
            </select>
          </label>

          <label>
            Profissão:
            <input type="text" name="profissao" value={formData.profissao} onChange={handleChange} />
          </label>

          <label>
            Contato:
            <input type="text" name="contato" value={formData.contato} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

        </div>
        <div className="questions">
          <h3>Histórico Familiar:</h3>

          <label>
            1º Descreva sua relação com seus pais durante sua infância?
            <textarea name="pergunta1" value={formData.pergunta1} onChange={handleChange} />
          </label>

          <label>
            2º Houve algum evento significativo em sua família que possa ter impactado sua relação com os outros, como separação dos pais, mudanças de residência, etc.?
            <textarea name="pergunta2" value={formData.pergunta2} onChange={handleChange} />
          </label>

          <label>
            3º Como era a dinâmica familiar em sua casa quando você era criança?
            <textarea name="pergunta3" value={formData.pergunta3} onChange={handleChange} />
          </label>
          <div className="questions">
            <h3>Criação e Relacionamentos Iniciais:</h3>

            <label>
              4º Como você descreveria sua infância?
              <textarea name="pergunta4" value={formData.pergunta4} onChange={handleChange} />
            </label>

            <label>
              5º Qual era o seu relacionamento com outros membros da família, como avós, tios ou primos?
              <textarea name="pergunta5" value={formData.pergunta5} onChange={handleChange} />
            </label>

            <label>
              6º Você teve cuidadores além de seus pais?
              <textarea name="pergunta6" value={formData.pergunta6} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="questions">
          <h3>Histórico Escolar - Ensino Fundamental 1:</h3>

          <label>
            7º Como era sua relação com seus professores durante os anos iniciais?
            <textarea name="pergunta7" value={formData.pergunta7} onChange={handleChange} />
          </label>

          <label>
            8º Você se sentia seguro na escola durante o Ensino Fundamental 1?
            <textarea name="pergunta8" value={formData.pergunta8} onChange={handleChange} />
          </label>

          <label>
            9º Já testemunhou ou foi vítima de algum caso de bullying durante esse período?
            <textarea name="pergunta9" value={formData.pergunta9} onChange={handleChange} />
          </label>

          <div className="questions">
            <h3>Histórico Escolar - Ensino Fundamental 2:</h3>

            <label>
              10º Houve alguma mudança significativa em sua vida durante este período que possa ter afetado sua relação com os outros na escola?
              <textarea name="pergunta10" value={formData.pergunta10} onChange={handleChange} />
            </label>

            <label>
              11º Como foi sua adaptação ao Ensino Fundamental 2 em comparação com o Ensino Fundamental 1?
              <textarea name="pergunta11" value={formData.pergunta11} onChange={handleChange} />
            </label>

            <label>
              12º Você se via como vítima de bullying, agressor ou observador passivo?
              <textarea name="pergunta12" value={formData.pergunta12} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="questions">
          <h3>Histórico Escolar - Ensino Médio:</h3>

          <label>
            13º Como foi sua transição para o Ensino Médio?
            <textarea name="pergunta13" value={formData.pergunta13} onChange={handleChange} />
          </label>

          <label>
            14º Houve algum evento específico que tenha influenciado suas interações sociais durante este período?
            <textarea name="pergunta14" value={formData.pergunta14} onChange={handleChange} />
          </label>

          <label>
            15º Você se envolveu em algum episódio de bullying como vítima ou agressor durante o Ensino Médio?
            <textarea name="pergunta15" value={formData.pergunta15} onChange={handleChange} />
          </label>

          <div className="questions">
            <h3>Comportamento Atual:</h3>

            <label>
              16º Como você se vê em termos de suas interações sociais atualmente?
              <textarea name="pergunta16" value={formData.pergunta16} onChange={handleChange} />
            </label>

            <label>
              17º Você já se envolveu em algum incidente de bullying recentemente, como vítima ou agressor?
              <textarea name="pergunta17" value={formData.pergunta17} onChange={handleChange} />
            </label>

            <label>
              18º Como você lida com conflitos interpessoais atualmente?
              <textarea name="pergunta18" value={formData.pergunta18} onChange={handleChange} />
            </label>
          </div>
        </div>

        <div className="questions">
          <h3>Observações Finais:</h3>

          <label>
            19º Há algo mais que gostaria de compartilhar sobre sua experiência educacional ou interações sociais que não tenha sido abordado nesta anamnese?
            <textarea name="pergunta19" value={formData.pergunta19} onChange={handleChange} />
          </label>
        </div>


        <div className="buttons-container">
          <button type="submit">Enviar</button>
          <Link to="/">
            <button className="back-button">Voltar</button>
          </Link>
        </div >
      </form >
    </div >
  );
}

export default AnamneseForm;
