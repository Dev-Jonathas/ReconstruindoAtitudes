import React, { useState } from "react";
import "../TelaLogin/Login.css";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Para redirecionar após o login

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });
  
      if (response.ok) {
        const data = await response.json();
  
        console.log("Login bem-sucedido:", data);
  
        // Salvar o token e o ID do mentorado no localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("mentoradoId", data.id);  // Aqui você salva o ID do mentorado
        localStorage.setItem('instituicaoId', data.instituicaoId);
        localStorage.setItem('mentorId', data.mentorId);
        
  
        // Redirecionar com base na role do usuário
        switch (data.userRole) {
          case "MENTORADO":
            navigate("/user"); // Rota para o usuário comum (mentorando)
            break;
          case "INSTITUICAO":
            navigate("/IES"); // Rota para a Instituição
            break;
          case "MENTOR":
            navigate("/usermentor");  // Caso tenha uma rota para mentor
            break;
          default:
            alert("Tipo de usuário desconhecido!");
            break;
        }
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erro ao fazer login. Verifique as credenciais.");
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      alert("Não foi possível realizar o login. Tente novamente mais tarde.");
    }
  };
  

  return (
    <div className="login-page">
      <div className="cadastro-container">
        <h1 className="h1Cadastro">Login</h1>
        <p>Novo nesse site?</p>
        <Link className="reg" to="/Cadastro">
          Registra-se
        </Link>

        <form style={{ marginTop: "20px" }} onSubmit={handleLogin}>
          <label>
            E-mail:
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </label>
          <Link className="E-senha" to="/recuperar-senha">
            Esqueceu a senha?
          </Link>
          <br />

          <button type="submit" className="BLogin">
            Fazer Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
